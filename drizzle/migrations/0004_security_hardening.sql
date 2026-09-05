-- Security hardening: RLS policies, storage listing, function EXECUTE grants

-- 1) Feedback: users can read their own submissions (previously admin-only reads)
CREATE POLICY "Users can read their own feedback"
ON public.feedback FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- 2) Notifications: remove overly permissive INSERT policy (was open to anon+authenticated).
DROP POLICY IF EXISTS "Service role can insert notifications" ON public.notifications;

-- 3) Replace always-true INSERT checks with real input validation
DROP POLICY IF EXISTS "anyone can insert events" ON public.app_events;
CREATE POLICY "anyone can insert events" ON public.app_events
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(event) BETWEEN 1 AND 100
  AND char_length(session_id) BETWEEN 1 AND 100
);

DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.feedback;
CREATE POLICY "Anyone can submit feedback" ON public.feedback
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(type) BETWEEN 1 AND 50
  AND (email IS NULL OR char_length(email) <= 320)
  AND (message IS NULL OR char_length(message) <= 5000)
);

DROP POLICY IF EXISTS "candidates insert by app" ON public.ingredient_candidates;
CREATE POLICY "candidates insert by app" ON public.ingredient_candidates
FOR INSERT TO anon, authenticated
WITH CHECK (char_length(ingredient_name) BETWEEN 1 AND 200);

-- 4) Storage: stop anonymous listing of public buckets (public URLs keep working)
DROP POLICY IF EXISTS "Anyone can view post images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view avatars" ON storage.objects;
CREATE POLICY "Users can list their own avatars" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = (auth.uid())::text);

-- 5) SECURITY DEFINER function EXECUTE hardening
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_public_profile(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_public_profiles(uuid[]) FROM PUBLIC, anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

REVOKE EXECUTE ON FUNCTION public.admin_active_users(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_active_users(integer) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.admin_activity_feed(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_activity_feed(integer) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.admin_camera_denials() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_camera_denials() TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.admin_candidates_counts() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_candidates_counts() TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.admin_candidates_list(text, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_candidates_list(text, integer) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.admin_feedback_counts() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_feedback_counts() TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.admin_feedback_list(boolean, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_feedback_list(boolean, integer, integer) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.admin_funnel() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_funnel() TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.admin_mira_cache_stats() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_mira_cache_stats() TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.admin_pulse() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_pulse() TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.admin_recent_events(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_recent_events(integer) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.admin_recent_feedback(boolean, integer, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_recent_feedback(boolean, integer, text) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.admin_recent_products(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_recent_products(integer) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.admin_recent_scans(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_recent_scans(integer) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.admin_resolve_feedback(uuid, text, boolean) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_resolve_feedback(uuid, text, boolean) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.admin_set_candidate_status(uuid, text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_set_candidate_status(uuid, text, text) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.admin_set_feedback_resolved(uuid, boolean, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_set_feedback_resolved(uuid, boolean, text) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.admin_stats() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_stats() TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.admin_top_scanned(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_top_scanned(integer) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.admin_usage_stats() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_usage_stats() TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.admin_users_list(integer, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_users_list(integer, text) TO authenticated, service_role;

-- increment_product_scan_count stays callable by anon+authenticated (anonymous scan flow uses it)
GRANT EXECUTE ON FUNCTION public.increment_product_scan_count(text) TO anon, authenticated, service_role;