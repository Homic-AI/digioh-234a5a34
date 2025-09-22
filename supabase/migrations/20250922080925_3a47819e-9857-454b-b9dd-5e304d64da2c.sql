-- Fix security issue: Remove public access to user emails
-- Drop the overly permissive policy that allows anyone to view all profiles
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create more secure policies
-- Users can view their own profile (needed for auth context)
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Admins and above can view all profiles (needed for user management)
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (has_min_role('admin'::user_role));