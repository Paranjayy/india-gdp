"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Issue {
  id: string;
  title: string;
  category: "Road Infrastructure" | "Housing" | "Environment" | "Bureaucracy" | "Traffic" | "Public Health";
  location: string;
  status: "Reported" | "In Progress" | "Resolved";
  reportedCount: number;
  costEstimate: string;
  responsibleDept: string;
  targetDate: string;
  progress: number;
  bottleneck: string;
  description: string;
  conflicts: {
    party: string;
    preference: string;
    weight: number;
  }[];
  debateThreads: {
    user: string;
    avatar: string;
    comment: string;
    votes: number;
    tone: "satirical" | "serious" | "constructive";
  }[];
}

const INITIAL_ISSUES: Issue[] = [
  {
    id: "#284728",
    title: "Ahmedabad Ward 17 Potholes & Drainage Failure",
    category: "Road Infrastructure",
    location: "Ahmedabad, Gujarat, India",
    status: "In Progress",
    reportedCount: 183,
    costEstimate: "₹12 lakh",
    responsibleDept: "AMC Roads Division",
    targetDate: "15 July 2026",
    progress: 63,
    bottleneck: "Waiting for post-monsoon dry asphalt supply clearance.",
    description: "Major structural potholes on the main market corridor causing gridlock and safety hazards during monsoon overflow.",
    conflicts: [
      { party: "Local Shopkeepers", preference: "Demands immediate fast patching during business hours without blocking storefront parking.", weight: 80 },
      { party: "Daily Commuters", preference: "Wants full high-grade road resurfacing done overnight with zero active lane blocks.", weight: 95 },
      { party: "AMC Municipal Engineers", preference: "Prefers systematic drainage pipeline overhaul first before laying final asphalt layer.", weight: 70 }
    ],
    debateThreads: [
      { user: "amdalover", avatar: "🦁", comment: "The pothole is so deep, I saw a local fish population starting to thrive in it. Can we get it declared a wetland?", votes: 42, tone: "satirical" },
      { user: "civil_eng_guy", avatar: "🏗️", comment: "Resurfacing without replacing the sub-base is useless. The water will seep back in two weeks. Drainage must be completed first.", votes: 29, tone: "serious" },
      { user: "pothole_patrol", avatar: "🛡️", comment: "Could we pool private funding to speedrun the asphalt mix purchase? AMC bureaucratic signing takes 3 weeks alone.", votes: 18, tone: "constructive" }
    ]
  },
  {
    id: "#102919",
    title: "San Francisco Housing Completions Deficit",
    category: "Housing",
    location: "San Francisco, CA, USA",
    status: "Reported",
    reportedCount: 1245,
    costEstimate: "$120 million",
    responsibleDept: "SF Planning Commission",
    targetDate: "31 Dec 2026",
    progress: 15,
    bottleneck: "Discretionary CEQA environmental review appeals process.",
    description: "SF completed fewer than 380 new housing units so far this year for a city of 800,000+ residents, leading to massive rent spikes.",
    conflicts: [
      { party: "NIMBY Homeowners", preference: "Keep existing zoning, restrict heights, preserve neighborhood character.", weight: 85 },
      { party: "YIMBY Activists", preference: "Legalize multi-family housing everywhere, fast-track permits, build up.", weight: 90 },
      { party: "City Planners", preference: "Negotiate affordable housing offsets, maintain strict building codes.", weight: 75 }
    ],
    debateThreads: [
      { user: "rent_is_too_high", avatar: "🏠", comment: "A 90% rent hike was handed down yesterday to my neighbor. It's almost cheaper to commute from Tokyo at this rate.", votes: 125, tone: "serious" },
      { user: "historic_laundromat", avatar: "🧺", comment: "We must preserve this historic parking garage, what if a ghost wants to park their horse there in the future?", votes: 88, tone: "satirical" },
      { user: "pro_density", avatar: "🏙️", comment: "Simple solution: remove discretionary review for projects conforming to the general plan. No more 3-year hearings for 6 apartments.", votes: 64, tone: "constructive" }
    ]
  },
  {
    id: "#302912",
    title: "Mumbai Coastal Road Bottleneck Resolution",
    category: "Traffic",
    location: "Mumbai, Maharashtra, India",
    status: "In Progress",
    reportedCount: 689,
    costEstimate: "₹45 crore",
    responsibleDept: "MCGM Traffic Engineering",
    targetDate: "30 Sept 2026",
    progress: 78,
    bottleneck: "Land acquisition for exit ramp merge lane.",
    description: "Severe bottlenecking at the transition ramp where the high-speed coastal road merges back into the legacy two-lane arterial streets.",
    conflicts: [
      { party: "South Mumbai Residents", preference: "Do not widen roads into local green buffers or residential tree linings.", weight: 75 },
      { party: "Suburban Commuters", preference: "Urgent widening of transition zones to prevent hours of idling during rush hour.", weight: 90 },
      { party: "Fishermen Union", preference: "Protect coastal docking lanes and access routes nearby during any extra reclamation.", weight: 85 }
    ],
    debateThreads: [
      { user: "mumbaikar_99", avatar: "🚗", comment: "Speeding down the coastal highway only to stand still for 45 minutes at the exit. The illusion of speed is beautiful.", votes: 73, tone: "satirical" },
      { user: "transit_now", avatar: "🚇", comment: "The only real solution is public rail extension. Widening lanes just induces more traffic in a cycle.", votes: 52, tone: "serious" },
      { user: "compromise_architect", avatar: "✏️", comment: "Elevated exit lane directly into the arterial bypass would avoid the local residential street impact completely.", votes: 31, tone: "constructive" }
    ]
  },
  {
    id: "#592811",
    title: "National AQI Mitigation & Smog Tower Optimization",
    category: "Environment",
    location: "New Delhi, NCR, India",
    status: "Reported",
    reportedCount: 2040,
    costEstimate: "₹18 crore",
    responsibleDept: "DPCC Air Quality Taskforce",
    targetDate: "15 Oct 2026",
    progress: 30,
    bottleneck: "Inter-state stubble-burning coordination & technology maintenance backlog.",
    description: "Ineffective localized smog filtration towers. Need a centralized, unified policy addressing emissions at source across NCR.",
    conflicts: [
      { party: "Farmers (Punjab/Haryana)", preference: "Need cheap stubble clearing alternatives or subsidized machinery before sowing window.", weight: 95 },
      { party: "Delhi Residents", preference: "Demand strict enforcement, clean air, and closure of heavy emitters.", weight: 100 },
      { party: "Industrial Operators", preference: "Avoid power cuts, fuel bans, or arbitrary factory shutdowns.", weight: 80 }
    ],
    debateThreads: [
      { user: "fresh_air_seeker", avatar: "😷", comment: "The air is so thick it counts as a solid meal. Who needs breakfast when you can inhale 200 cigarettes on the way to work?", votes: 140, tone: "satirical" },
      { user: "agri_scientist", avatar: "🌾", comment: "Happy Seeder machines work but farmers need fuel subsidy to run them. Fining farmers who can barely afford seeds doesn't work.", votes: 85, tone: "serious" },
      { user: "green_innovator", avatar: "💡", comment: "Convert straw into compressed bio-gas. Set up collection hubs within 20km of every farming cluster to create commercial value.", votes: 55, tone: "constructive" }
    ]
  }
];

export default function GovernanceTracker() {
  const [issues, setIssues] = useState<Issue[]>(INITIAL_ISSUES);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(INITIAL_ISSUES[0]);
  const [activeTab, setActiveTab] = useState<"resolver" | "debates">("resolver");

  // New Comment Input
  const [newComment, setNewComment] = useState("");
  const [selectedTone, setSelectedTone] = useState<"satirical" | "serious" | "constructive">("constructive");

  const categories = ["All", "Road Infrastructure", "Housing", "Environment", "Bureaucracy", "Traffic", "Public Health"];

  const filteredIssues = useMemo(() => {
    if (selectedCategory === "All") return issues;
    return issues.filter((i) => i.category === selectedCategory);
  }, [issues, selectedCategory]);

  const handleVote = (index: number) => {
    if (!selectedIssue) return;
    const updatedThreads = [...selectedIssue.debateThreads];
    updatedThreads[index] = {
      ...updatedThreads[index],
      votes: updatedThreads[index].votes + 1,
    };
    const updatedIssue = { ...selectedIssue, debateThreads: updatedThreads };
    setSelectedIssue(updatedIssue);
    setIssues(issues.map((i) => (i.id === selectedIssue.id ? updatedIssue : i)));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIssue || !newComment.trim()) return;

    const newCommentObj = {
      user: "anonymous_citizen",
      avatar: "👤",
      comment: newComment,
      votes: 1,
      tone: selectedTone,
    };

    const updatedThreads = [newCommentObj, ...selectedIssue.debateThreads];
    const updatedIssue = { ...selectedIssue, debateThreads: updatedThreads };
    setSelectedIssue(updatedIssue);
    setIssues(issues.map((i) => (i.id === selectedIssue.id ? updatedIssue : i)));
    setNewComment("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* ── Left Side: List of Issues (5 cols) ── */}
      <div className="lg:col-span-5 space-y-4">
        {/* Category Pill Filters */}
        <div className="flex gap-1 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? "bg-[--color-ink] text-white border-[--color-ink]"
                  : "bg-white text-[--color-muted] border-[--color-hairline] hover:text-[--color-ink] hover:bg-neutral-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Issue Cards */}
        <div className="space-y-3 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
          {filteredIssues.map((issue) => {
            const isSelected = selectedIssue?.id === issue.id;
            return (
              <button
                key={issue.id}
                onClick={() => {
                  setSelectedIssue(issue);
                  setActiveTab("resolver");
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                  isSelected
                    ? "bg-white border-[--color-ink] shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                    : "bg-white/60 hover:bg-white border-[--color-hairline] hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
                }`}
              >
                <div className="flex justify-between items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-[--color-muted] uppercase tracking-wider">
                    {issue.category} · {issue.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-tight uppercase ${
                      issue.status === "Resolved"
                        ? "bg-green-100 text-green-700"
                        : issue.status === "In Progress"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {issue.status}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[--color-ink] leading-tight mb-2">
                  {issue.title}
                </h3>
                <p className="text-xs text-[--color-muted] line-clamp-2 mb-3">
                  {issue.description}
                </p>
                <div className="flex justify-between items-center text-[10px] text-[--color-muted] font-medium border-t border-[--color-hairline] pt-2">
                  <span>📍 {issue.location.split(",")[0]}</span>
                  <span>🔧 {issue.progress}% resolved</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Right Side: Issue Workspace / Detail (7 cols) ── */}
      <div className="lg:col-span-7 bg-white border border-[--color-hairline] shadow-[0_12px_32px_rgba(0,0,0,0.04)] rounded-3xl p-6 min-h-[500px] flex flex-col">
        {selectedIssue ? (
          <div className="flex-1 flex flex-col">
            {/* Context & Metadata Header */}
            <div className="border-b border-[--color-hairline] pb-4 mb-4">
              <div className="flex justify-between items-start gap-4 mb-2 flex-wrap">
                <div>
                  <span className="text-[10px] font-bold text-[--color-muted] uppercase tracking-wider">
                    {selectedIssue.category} · {selectedIssue.id}
                  </span>
                  <h2 className="text-lg font-bold text-[--color-ink] leading-snug">
                    {selectedIssue.title}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <div className="text-right">
                    <div className="text-[9px] text-[--color-muted] uppercase font-bold">Progress</div>
                    <div className="text-sm font-bold text-[--color-ink] tabular-nums">
                      {selectedIssue.progress}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-[--color-india-saffron] transition-all duration-500 rounded-full"
                  style={{ width: `${selectedIssue.progress}%` }}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-medium text-[--color-muted] pt-2">
                <div>
                  <span className="block text-[9px] uppercase font-bold text-neutral-400">Responsible Agency</span>
                  <span className="text-[--color-ink]">{selectedIssue.responsibleDept}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-bold text-neutral-400">Cost Estimate</span>
                  <span className="text-[--color-ink] font-bold">{selectedIssue.costEstimate}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-bold text-neutral-400">Target Resolution</span>
                  <span className="text-[--color-ink]">{selectedIssue.targetDate}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-bold text-neutral-400">Reports filed</span>
                  <span className="text-[--color-ink] font-bold">{selectedIssue.reportedCount} citizens</span>
                </div>
              </div>
            </div>

            {/* Workplace Tabs */}
            <div className="flex gap-0.5 p-0.5 rounded-xl bg-black/[.03] mb-4">
              <button
                onClick={() => setActiveTab("resolver")}
                className={`flex-1 text-center py-2 text-[11px] font-bold rounded-lg transition-all ${
                  activeTab === "resolver"
                    ? "bg-white text-[--color-ink] shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                    : "text-[--color-muted] hover:text-[--color-ink]"
                }`}
              >
                Dispute Resolver
              </button>
              <button
                onClick={() => setActiveTab("debates")}
                className={`flex-1 text-center py-2 text-[11px] font-bold rounded-lg transition-all ${
                  activeTab === "debates"
                    ? "bg-white text-[--color-ink] shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                    : "text-[--color-muted] hover:text-[--color-ink]"
                }`}
              >
                Debate Arena ({selectedIssue.debateThreads.length})
              </button>
            </div>

            {/* Scrollable Work Pane */}
            <div className="flex-1 overflow-y-auto max-h-[450px] pr-1 space-y-4">
              <AnimatePresence mode="wait">
                {activeTab === "resolver" ? (
                  <motion.div
                    key="resolver"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {/* Description Blurb */}
                    <div className="bg-neutral-50/70 border border-[--color-hairline] rounded-2xl p-4">
                      <h4 className="text-xs font-bold text-[--color-ink] mb-1">Issue Overview</h4>
                      <p className="text-xs text-[--color-muted] leading-relaxed">
                        {selectedIssue.description}
                      </p>
                    </div>

                    {/* Active Bottleneck tracking */}
                    <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4">
                      <div className="flex items-center gap-1.5 text-red-800 text-[10px] font-bold uppercase tracking-wider mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                        Active Resolution Bottleneck
                      </div>
                      <p className="text-xs text-red-900 leading-relaxed font-medium">
                        {selectedIssue.bottleneck}
                      </p>
                    </div>

                    {/* Conflicts preferences list */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-[--color-ink] uppercase tracking-wider">
                        Preference Mappings & Conflict Vectors
                      </h4>
                      <div className="space-y-3">
                        {selectedIssue.conflicts.map((c, idx) => (
                          <div key={idx} className="bg-white border border-[--color-hairline] rounded-2xl p-4 space-y-2">
                            <div className="flex justify-between items-center gap-2">
                              <span className="text-xs font-semibold text-[--color-ink]">{c.party}</span>
                              <span className="text-[10px] text-[--color-muted] font-medium">
                                Weight: {c.weight}%
                              </span>
                            </div>
                            <p className="text-xs text-[--color-muted] leading-relaxed">
                              {c.preference}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Dispute Resolver Summary from Chatty */}
                    <div className="bg-amber-50/50 border border-amber-200/40 rounded-2xl p-4">
                      <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                        🤖 AI Dispute Resolver Perspective (Chatty)
                      </h4>
                      <p className="text-xs text-amber-900/90 leading-relaxed">
                        Values conflict arises not from facts, but from different preference prioritization. Shopkeepers prioritize short-term trade flow, commuters prioritize transit speed, and engineering teams prioritize structural durability. A compromise requires setting a strict overnight repair protocol accompanied by subsidized municipal validation grids to compensate shopkeepers.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="debates"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {/* Add Comment Form */}
                    <form onSubmit={handleAddComment} className="bg-neutral-50/50 border border-[--color-hairline] rounded-2xl p-4 space-y-3">
                      <div className="flex justify-between items-center gap-2">
                        <label className="text-xs font-bold text-[--color-ink]">Voice your view anonymously</label>
                        <div className="flex gap-1">
                          {(["satirical", "serious", "constructive"] as const).map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setSelectedTone(t)}
                              className={`px-2 py-0.5 rounded text-[9px] font-bold capitalize transition ${
                                selectedTone === t
                                  ? "bg-[--color-ink] text-white"
                                  : "bg-white text-[--color-muted] border border-[--color-hairline]"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share feedback, sarcasm, or constructive alternatives. Be kind, but sarcasm is welcome."
                        rows={2}
                        className="w-full text-xs p-2.5 rounded-xl border border-[--color-hairline] bg-white text-[--color-ink] placeholder:text-[--color-muted] focus:outline-none focus:ring-1 focus:ring-[--color-ink]"
                      />
                      <button
                        type="submit"
                        className="w-full py-1.5 rounded-xl bg-[--color-ink] text-white text-xs font-bold hover:brightness-90 transition"
                      >
                        Publish View
                      </button>
                    </form>

                    {/* Comments list */}
                    <div className="space-y-2.5">
                      {selectedIssue.debateThreads.map((comment, idx) => (
                        <div key={idx} className="bg-white border border-[--color-hairline] rounded-2xl p-4 space-y-2.5">
                          <div className="flex justify-between items-center gap-2">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm">{comment.avatar}</span>
                              <span className="text-xs font-semibold text-[--color-ink]">{comment.user}</span>
                              <span
                                className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-tight ${
                                  comment.tone === "satirical"
                                    ? "bg-purple-100 text-purple-700"
                                    : comment.tone === "serious"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-green-100 text-green-700"
                                }`}
                              >
                                {comment.tone}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleVote(idx)}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg hover:bg-neutral-100 transition text-[11px] font-bold text-[--color-muted]"
                            >
                              ▲ <span className="tabular-nums">{comment.votes}</span>
                            </button>
                          </div>
                          <p className="text-xs text-[--color-muted] leading-relaxed">
                            {comment.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center text-[--color-muted] text-xs">
            Select an issue from the tracking list to explore details and debate.
          </div>
        )}
      </div>
    </div>
  );
}
