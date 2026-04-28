"use client";

import { useState, useEffect } from "react";
import { 
  LayoutDashboard, Users, FolderKanban, Settings, LogOut, Plus, 
  Trash2, ExternalLink, MessageSquare, Star, Share2, MapPin, 
  BarChart3, Save, Loader2, Image as ImageIcon
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const AdminDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [siteSettings, setSiteSettings] = useState({
    siteName: "SolarEco",
    whatsapp: "",
    email: "",
    phone: "",
    address: "",
    googleMapsUrl: "",
    socialLinks: { facebook: "", instagram: "", linkedin: "", twitter: "" }
  });
  const [loading, setLoading] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("admin_token");
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    setLoading(true);
    try {
      const headers = { "Authorization": `Bearer ${token}` };
      const [leadRes, projRes, testRes, settRes] = await Promise.all([
        fetch(`${apiBase}/api/leads`, { headers }),
        fetch(`${apiBase}/api/projects`, { headers }),
        fetch(`${apiBase}/api/testimonials`),
        fetch(`${apiBase}/api/settings`)
      ]);
      
      if (leadRes.ok) setLeads(await leadRes.json());
      if (projRes.ok) setProjects(await projRes.json());
      if (testRes.ok) setTestimonials(await testRes.json());
      if (settRes.ok) setSiteSettings(await settRes.json());
    } catch (err) {
      console.error("Fetch error", err);
    }
    setLoading(false);
  };

  const handleAddProject = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    const token = localStorage.getItem("admin_token");
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    try {
      const res = await fetch(`${apiBase}/api/projects`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setShowAddProject(false);
        fetchData();
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const token = localStorage.getItem("admin_token");
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    try {
      await fetch(`${apiBase}/api/projects/${id}`, { 
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleSaveSettings = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    try {
      await fetch(`${apiBase}/api/settings`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(siteSettings)
      });
      alert("Settings saved!");
    } catch (err) { console.error(err); }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "leads", label: "Leads", icon: <Users className="w-5 h-5" /> },
    { id: "gallery", label: "Gallery & Projects", icon: <ImageIcon className="w-5 h-5" /> },
    { id: "testimonials", label: "Testimonials", icon: <Star className="w-5 h-5" /> },
    { id: "social", label: "Social & Maps", icon: <Share2 className="w-5 h-5" /> },
    { id: "settings", label: "SEO Settings", icon: <BarChart3 className="w-5 h-5" /> },
  ];

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 p-6 flex flex-col sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-12 px-2">
          <div className="bg-solar-gradient p-2 rounded-lg">
             <LayoutDashboard className="w-6 h-6 text-slate-900" />
          </div>
          <span className="text-xl font-bold tracking-tight">Solar<span className="text-primary">Eco</span></span>
        </div>

        <nav className="flex-1 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeTab === item.id 
                ? "bg-primary/10 text-primary border border-primary/20" 
                : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-400 transition-colors mt-auto border-t border-slate-800 pt-6"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold capitalize">{activeTab.replace("-", " ")}</h1>
            <p className="text-slate-500 mt-1">Control center for your solar business portal.</p>
          </div>
          <div className="flex gap-4">
            {loading && <Loader2 className="w-6 h-6 animate-spin text-primary" />}
            <button onClick={fetchData} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">
              <Plus className="w-5 h-5 rotate-45" />
            </button>
          </div>
        </header>

        {/* --- OVERVIEW --- */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Total Leads", val: leads.length, color: "text-blue-400", icon: <Users /> },
                { label: "Active Projects", val: projects.length, color: "text-primary", icon: <FolderKanban /> },
                { label: "Reviews", val: testimonials.length, color: "text-accent", icon: <MessageSquare /> },
                { label: "Conversion", val: "12%", color: "text-purple-400", icon: <BarChart3 /> },
              ].map((stat) => (
                <div key={stat.label} className="glass p-6 rounded-3xl">
                  <div className={`${stat.color} mb-4`}>{stat.icon}</div>
                  <div className="text-3xl font-bold mb-1">{stat.val}</div>
                  <div className="text-slate-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-3xl">
                <h3 className="font-bold mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" /> Recent Leads
                </h3>
                <div className="space-y-4">
                  {leads.slice(0, 5).map((l: any) => (
                    <div key={l._id} className="flex justify-between items-center p-3 hover:bg-white/5 rounded-xl transition-colors">
                      <div>
                        <div className="font-medium">{l.name}</div>
                        <div className="text-xs text-slate-500">{l.phone}</div>
                      </div>
                      <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-md">NEW</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass p-8 rounded-3xl">
                <h3 className="font-bold mb-6 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-accent" /> Project Map
                </h3>
                <div className="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800">
                  <MapPin className="w-12 h-12 text-slate-700 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- LEADS --- */}
        {activeTab === "leads" && (
          <div className="glass rounded-3xl overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="px-6 py-4 font-bold text-sm">Customer Details</th>
                  <th className="px-6 py-4 font-bold text-sm">Message</th>
                  <th className="px-6 py-4 font-bold text-sm">Date</th>
                  <th className="px-6 py-4 font-bold text-sm">Status</th>
                  <th className="px-6 py-4 font-bold text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {leads.map((lead: any) => (
                  <tr key={lead._id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold">{lead.name}</div>
                      <div className="text-sm text-slate-500">{lead.email}</div>
                      <div className="text-xs text-primary">{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400 max-w-xs truncate">
                      {lead.message || "No message"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {mounted ? new Date(lead.createdAt).toLocaleDateString() : ""}
                    </td>
                    <td className="px-6 py-4">
                      <select className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs outline-none focus:border-primary">
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-white"><ExternalLink className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- GALLERY & PROJECTS --- */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">Portfolio Items</h3>
              <button 
                onClick={() => setShowAddProject(!showAddProject)}
                className="bg-primary text-slate-900 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </div>

            {showAddProject && (
              <form onSubmit={handleAddProject} className="glass p-8 rounded-3xl grid grid-cols-2 gap-6 animate-in slide-in-from-top duration-300">
                <div className="space-y-4">
                  <input name="title" required placeholder="Project Title" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3" />
                  <select name="category" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3">
                    <option>Residential</option>
                    <option>Commercial</option>
                  </select>
                  <input name="location" placeholder="Location (City, State)" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3" />
                </div>
                <div className="space-y-4">
                  <input name="capacity" placeholder="Capacity (e.g. 10kW)" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3" />
                  <input name="image" placeholder="Image URL (Unsplash/Cloudinary)" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3" />
                  <div className="flex gap-4 pt-2">
                    <button type="submit" className="flex-1 bg-primary text-slate-900 font-bold py-3 rounded-xl">Save Project</button>
                    <button type="button" onClick={() => setShowAddProject(false)} className="flex-1 bg-slate-800 font-bold py-3 rounded-xl">Cancel</button>
                  </div>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((p: any) => (
                <div key={p._id} className="glass rounded-2xl overflow-hidden relative group">
                  <img src={p.image} className="w-full h-48 object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="p-4">
                    <h4 className="font-bold">{p.title}</h4>
                    <p className="text-xs text-slate-500">{p.category} • {p.location}</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteProject(p._id)}
                    className="absolute top-4 right-4 bg-red-500/80 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- SOCIAL & CONTACT --- */}
        {activeTab === "social" && (
          <form onSubmit={handleSaveSettings} className="max-w-4xl space-y-8">
            <div className="glass p-8 rounded-3xl">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-primary" /> Social Media Links
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {["facebook", "instagram", "linkedin", "twitter"].map((social) => (
                  <div key={social} className="space-y-2">
                    <label className="text-xs text-slate-500 capitalize">{social} URL</label>
                    <input 
                      type="text" 
                      value={(siteSettings.socialLinks as any)?.[social] || ""}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings, 
                        socialLinks: { ...siteSettings.socialLinks, [social]: e.target.value }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm" 
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-8 rounded-3xl">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" /> Google Maps & Address
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs text-slate-500">Google Maps Embed URL</label>
                  <input 
                    type="text" 
                    value={siteSettings.googleMapsUrl}
                    onChange={(e) => setSiteSettings({ ...siteSettings, googleMapsUrl: e.target.value })}
                    placeholder="https://www.google.com/maps/embed?..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-500">Business Address</label>
                  <textarea 
                    value={siteSettings.address}
                    onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm h-24" 
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="bg-primary text-slate-900 px-10 py-4 rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              <Save className="w-5 h-5" /> Save Global Changes
            </button>
          </form>
        )}

        {/* --- SEO SETTINGS --- */}
        {activeTab === "settings" && (
          <div className="glass p-10 rounded-[3rem] max-w-3xl">
            <h3 className="text-2xl font-bold mb-8">Search Engine Optimization</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Meta Title</label>
                <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-3" defaultValue="SolarEco | Premium Solar Installation" />
                <p className="text-[10px] text-slate-500">Recommended: 50-60 characters</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Meta Description</label>
                <textarea className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-3 h-32" defaultValue="Save up to 80% on electricity bills with SolarEco..." />
                <p className="text-[10px] text-slate-500">Recommended: 150-160 characters</p>
              </div>
              <button className="bg-solar-gradient text-slate-900 px-8 py-3 rounded-xl font-bold mt-4">Update SEO</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
