@@ .. @@
    { id: 'projects', name: 'Projets', icon: FileText },
    { id: 'products', name: 'Produits', icon: TrendingUp },
    { id: 'experts', name: 'Experts', icon: Users },
+    { id: 'categories', name: 'Catégories', icon: Tag },
     { id: 'users', name: 'Utilisateurs', icon: Users },
     { id: 'newsletter', name: 'Newsletter', icon: Mail },
     { id: 'settings', name: 'Paramètres', icon: Settings }
@@ .. @@
import UserManagement from './admin/UserManagement';
import NewsletterManagement from './admin/NewsletterManagement';
import SettingsManagement from './admin/SettingsManagement';
import ExpertManagement from './admin/ExpertManagement';
+import CategoryManagement from './admin/CategoryManagement';

export default function AdminDashboard() {
@@ .. @@
  Users, 
  FileText, 
  MessageCircle, 
  Building, 
  Eye, 
  TrendingUp,
  Home,
  Mail,
-  Settings
+  Settings,
+  Tag
 } from 'lucide-react';
@@ .. @@
            {activeTab === 'experts' && (
              <ExpertManagement />
            )}

+            {activeTab === 'categories' && (
+              <CategoryManagement />
+            )}
+
             {activeTab === 'users' && (
               <UserManagement />
             )}