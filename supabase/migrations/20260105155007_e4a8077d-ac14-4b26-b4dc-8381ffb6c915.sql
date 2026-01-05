-- Fix #1: Update post_comments SELECT policy to check parent post visibility
DROP POLICY IF EXISTS "Users can view comments on visible posts" ON public.post_comments;

CREATE POLICY "Users can view comments on visible posts" 
ON public.post_comments 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.community_posts 
    WHERE id = post_comments.post_id 
    AND (
      visibility = 'everyone' 
      OR visibility = 'women_only'
      OR (visibility = 'only_me' AND user_id = auth.uid())
    )
  )
);

-- Fix #3: Add permission checks to security definer functions
-- Update update_likes_count to verify user can access the post
CREATE OR REPLACE FUNCTION public.update_likes_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  post_visibility TEXT;
  post_owner UUID;
BEGIN
  -- Get post details
  SELECT visibility, user_id INTO post_visibility, post_owner
  FROM public.community_posts 
  WHERE id = COALESCE(NEW.post_id, OLD.post_id);
  
  -- Verify user can access this post (public posts or own private posts)
  IF post_visibility = 'only_me' AND post_owner != COALESCE(NEW.user_id, OLD.user_id) THEN
    RAISE EXCEPTION 'Cannot like a private post';
  END IF;

  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$function$;

-- Update update_comments_count to verify user can access the post
CREATE OR REPLACE FUNCTION public.update_comments_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  post_visibility TEXT;
  post_owner UUID;
BEGIN
  -- Get post details
  SELECT visibility, user_id INTO post_visibility, post_owner
  FROM public.community_posts 
  WHERE id = COALESCE(NEW.post_id, OLD.post_id);
  
  -- Verify user can access this post (public posts or own private posts)
  IF post_visibility = 'only_me' AND post_owner != COALESCE(NEW.user_id, OLD.user_id) THEN
    RAISE EXCEPTION 'Cannot comment on a private post';
  END IF;

  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_posts SET comments_count = comments_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$function$;