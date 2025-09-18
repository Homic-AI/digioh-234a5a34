-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('superadmin', 'admin', 'editor', 'author');

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role user_role NOT NULL DEFAULT 'author',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT, -- Lucide icon name
  gallery_images TEXT[], -- Array of image URLs
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create portfolio categories
CREATE TABLE public.portfolio_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create portfolio table
CREATE TABLE public.portfolio (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  client TEXT,
  description TEXT,
  category_id UUID REFERENCES public.portfolio_categories(id),
  project_date DATE,
  images TEXT[], -- Array of image URLs
  videos TEXT[], -- Array of video URLs
  featured_image TEXT,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create team members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  photo_url TEXT,
  bio TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  instagram_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create client logos table
CREATE TABLE public.client_logos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  author_id UUID NOT NULL REFERENCES public.profiles(user_id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  seo_title TEXT,
  seo_description TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site settings table
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_logos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Create function to check if user has role
CREATE OR REPLACE FUNCTION public.has_role(_role user_role)
RETURNS BOOLEAN AS $$
  SELECT public.get_current_user_role() = _role;
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Create function to check if user has minimum role level
CREATE OR REPLACE FUNCTION public.has_min_role(_role user_role)
RETURNS BOOLEAN AS $$
  SELECT CASE 
    WHEN public.get_current_user_role() = 'superadmin' THEN true
    WHEN public.get_current_user_role() = 'admin' AND _role IN ('admin', 'editor', 'author') THEN true
    WHEN public.get_current_user_role() = 'editor' AND _role IN ('editor', 'author') THEN true
    WHEN public.get_current_user_role() = 'author' AND _role = 'author' THEN true
    ELSE false
  END;
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "SuperAdmin can manage all profiles" ON public.profiles FOR ALL USING (public.has_role('superadmin'));

-- RLS Policies for public content (services, portfolio, team, clients)
CREATE POLICY "Anyone can view published services" ON public.services FOR SELECT USING (published = true);
CREATE POLICY "Editors can manage services" ON public.services FOR ALL USING (public.has_min_role('editor'));

CREATE POLICY "Anyone can view portfolio categories" ON public.portfolio_categories FOR SELECT USING (true);
CREATE POLICY "Editors can manage categories" ON public.portfolio_categories FOR ALL USING (public.has_min_role('editor'));

CREATE POLICY "Anyone can view published portfolio" ON public.portfolio FOR SELECT USING (published = true);
CREATE POLICY "Editors can manage portfolio" ON public.portfolio FOR ALL USING (public.has_min_role('editor'));

CREATE POLICY "Anyone can view active team members" ON public.team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Editors can manage team members" ON public.team_members FOR ALL USING (public.has_min_role('editor'));

CREATE POLICY "Anyone can view active client logos" ON public.client_logos FOR SELECT USING (is_active = true);
CREATE POLICY "Editors can manage client logos" ON public.client_logos FOR ALL USING (public.has_min_role('editor'));

-- RLS Policies for blog posts
CREATE POLICY "Anyone can view published posts" ON public.blog_posts FOR SELECT USING (status = 'published' AND published_at <= now());
CREATE POLICY "Authors can view own posts" ON public.blog_posts FOR SELECT USING (author_id = auth.uid());
CREATE POLICY "Authors can create posts" ON public.blog_posts FOR INSERT WITH CHECK (author_id = auth.uid());
CREATE POLICY "Authors can update own drafts" ON public.blog_posts FOR UPDATE USING (author_id = auth.uid() AND status = 'draft');
CREATE POLICY "Editors can manage all posts" ON public.blog_posts FOR ALL USING (public.has_min_role('editor'));

-- RLS Policies for contact submissions
CREATE POLICY "Anyone can create contact submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Editors can view contact submissions" ON public.contact_submissions FOR SELECT USING (public.has_min_role('editor'));
CREATE POLICY "Editors can manage contact submissions" ON public.contact_submissions FOR ALL USING (public.has_min_role('editor'));

-- RLS Policies for site settings
CREATE POLICY "Anyone can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage site settings" ON public.site_settings FOR ALL USING (public.has_min_role('admin'));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_portfolio_updated_at BEFORE UPDATE ON public.portfolio FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_client_logos_updated_at BEFORE UPDATE ON public.client_logos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'author')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Create storage policies
CREATE POLICY "Media files are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Authenticated users can upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');
CREATE POLICY "Editors can manage media" ON storage.objects FOR ALL USING (bucket_id = 'media' AND public.has_min_role('editor'));

CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload their own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update their own avatar" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Insert default portfolio categories
INSERT INTO public.portfolio_categories (name, slug) VALUES 
('Brand Identity', 'brand-identity'),
('Web Design', 'web-design'),
('Digital Marketing', 'digital-marketing'),
('Event Management', 'event-management'),
('Photography', 'photography'),
('Video Production', 'video-production');

-- Insert sample data for services
INSERT INTO public.services (title, slug, description, icon, is_featured, sort_order) VALUES
('Brand Identity Design', 'brand-identity-design', 'Create memorable brand identities that resonate with your target audience and stand out in competitive markets.', 'Palette', true, 1),
('Web Development', 'web-development', 'Build responsive, fast, and user-friendly websites that convert visitors into customers.', 'Code', true, 2),
('Digital Marketing', 'digital-marketing', 'Drive growth through strategic digital marketing campaigns across all major platforms.', 'TrendingUp', true, 3),
('Event Management', 'event-management', 'Plan and execute memorable events that leave lasting impressions on your audience.', 'Calendar', true, 4),
('Creative Production', 'creative-production', 'Professional photography and video production services for all your marketing needs.', 'Camera', true, 5);

-- Insert sample team members
INSERT INTO public.team_members (name, role, bio, sort_order) VALUES
('Sarah Johnson', 'Creative Director', 'Leading creative visionary with 10+ years in brand development and design strategy.', 1),
('Michael Chen', 'Senior Developer', 'Full-stack developer specializing in modern web technologies and user experience.', 2),
('Emily Rodriguez', 'Marketing Strategist', 'Digital marketing expert focused on ROI-driven campaigns and audience engagement.', 3),
('David Kim', 'Event Manager', 'Event planning specialist with expertise in corporate and luxury events.', 4);

-- Insert sample client logos (placeholder data)
INSERT INTO public.client_logos (name, logo_url, website_url, sort_order) VALUES
('TechCorp International', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop', 'https://techcorp.com', 1),
('Innovation Labs', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop', 'https://innovationlabs.com', 2),
('Global Finance Group', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop', 'https://globalfinance.com', 3),
('Marketing Association', 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&h=100&fit=crop', 'https://marketingassoc.com', 4),
('MedTech Solutions', 'https://images.unsplash.com/photo-1635405074426-d9e210dc2edf?w=200&h=100&fit=crop', 'https://medtechsolutions.com', 5),
('Venture Capital Network', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&h=100&fit=crop', 'https://vcnetwork.com', 6);

-- Insert sample site settings
INSERT INTO public.site_settings (key, value) VALUES
('site_title', 'digiOH - Digital Event Management'),
('site_description', 'Professional digital event management and creative services since 2015'),
('contact_email', 'hello@digioh.com'),
('contact_phone', '+1 (555) 123-4567'),
('contact_address', '123 Digital Avenue, Tech City, TC 12345'),
('whatsapp_number', '+15551234567'),
('linkedin_url', 'https://linkedin.com/company/digioh'),
('twitter_url', 'https://twitter.com/digioh'),
('instagram_url', 'https://instagram.com/digioh');