
-- Add staff pick flag to community posts
ALTER TABLE public.community_posts 
ADD COLUMN is_staff_pick boolean DEFAULT false;

-- Only admins can set/unset staff picks
CREATE POLICY "Admins can update staff pick status"
ON public.community_posts
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
