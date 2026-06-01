"use client";

import * as React from "react";
import { MoreHorizontal, Eye, Edit, UserX, Search, Shield, Filter, Download, Mail, ChevronLeft, ChevronRight, Ban, CheckCircle2, Clock, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

const users = [
  { id: 1, name: "Marcus Chen", email: "marcus.chen@traderpro.io", status: "active", tier: "Pro", joined: "2024-01-15", lastActive: "2 hours ago", tradingVolume: 245000, accountType: "Funded", kyc: "verified", country: "US" },
  { id: 2, name: "Sofia Rodriguez", email: "sofia.r@capitalflows.net", status: "active", tier: "Elite", joined: "2024-02-20", lastActive: "15 minutes ago", tradingVolume: 189500, accountType: "Funded", kyc: "verified", country: "ES" },
  { id: 3, name: "James Wright", email: "j.wright@wealthmakers.com", status: "suspended", tier: "Standard", joined: "2023-11-08", lastActive: "3 days ago", tradingVolume: 78200, accountType: "Challenge", kyc: "verified", country: "UK" },
  { id: 4, name: "Aisha Patel", email: "aisha.patel@nexustrade.co", status: "active", tier: "Elite", joined: "2024-03-01", lastActive: "1 hour ago", tradingVolume: 312800, accountType: "Funded", kyc: "verified", country: "IN" },
  { id: 5, name: "Erik Lindqvist", email: "erik.l@nordicfx.se", status: "active", tier: "Pro", joined: "2023-12-12", lastActive: "30 minutes ago", tradingVolume: 156400, accountType: "Funded", kyc: "pending", country: "SE" },
  { id: 6, name: "Priya Sharma", email: "priya.s@investedge.in", status: "active", tier: "Pro", joined: "2024-01-28", lastActive: "4 hours ago", tradingVolume: 223100, accountType: "Funded", kyc: "verified", country: "IN" },
  { id: 7, name: "Michael Torres", email: "m.torres@profitmatrix.mx", status: "suspended", tier: "Standard", joined: "2023-09-05", lastActive: "2 weeks ago", tradingVolume: 45600, accountType: "Challenge", kyc: "rejected", country: "MX" },
  { id: 8, name: "Yuki Tanaka", email: "y.tanaka@tokyotrades.jp", status: "active", tier: "Elite", joined: "2024-02-14", lastActive: "Online now", tradingVolume: 178900, accountType: "Funded", kyc: "verified", country: "JP" },
  { id: 9, name: "Elena Volkov", email: "elena.v@rostrades.ru", status: "active", tier: "Pro", joined: "2023-10-22", lastActive: "6 hours ago", tradingVolume: 134700, accountType: "Funded", kyc: "verified", country: "RU" },
  { id: 10, name: "David Kimani", email: "d.kimani@safaritrades.ke", status: "active", tier: "Standard", joined: "2024-03-10", lastActive: "45 minutes ago", tradingVolume: 98300, accountType: "Challenge", kyc: "verified", country: "KE" },
  { id: 11, name: "Hannah Lee", email: "hannah.l@apexcapital.sg", status: "active", tier: "Elite", joined: "2024-01-05", lastActive: "5 minutes ago", tradingVolume: 456800, accountType: "Funded", kyc: "verified", country: "SG" },
  { id: 12, name: "Lucas Müller", email: "lucas.m@berlintraders.de", status: "pending", tier: "Standard", joined: "2024-03-18", lastActive: "Just now", tradingVolume: 0, accountType: "Signup", kyc: "pending", country: "DE" },
  { id: 13, name: "Olivia Brown", email: "olivia.b@londontrades.uk", status: "active", tier: "Pro", joined: "2023-08-14", lastActive: "20 minutes ago", tradingVolume: 287600, accountType: "Funded", kyc: "verified", country: "UK" },
  { id: 14, name: "Ahmed Al-Rashid", email: "ahmed.r@emiratescap.ae", status: "active", tier: "Elite", joined: "2024-02-02", lastActive: "1 hour ago", tradingVolume: 198400, accountType: "Funded", kyc: "verified", country: "AE" },
  { id: 15, name: "Carlos Mendez", email: "carlos.m@buenosairestrades.ar", status: "active", tier: "Pro", joined: "2023-11-19", lastActive: "3 hours ago", tradingVolume: 145200, accountType: "Funded", kyc: "verified", country: "AR" },
];

const kycColors: Record<string, string> = {
  verified: "text-green-400 bg-green-400/10 border-green-400/20",
  pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  rejected: "text-red-400 bg-red-400/10 border-red-400/20",
};

const statusColors: Record<string, string> = {
  active: "bg-primary/15 text-primary border-primary/30",
  suspended: "bg-red-500/15 text-red-400 border-red-500/30",
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
};

const tierColors: Record<string, string> = {
  Standard: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  Pro: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Elite: "bg-purple-500/15 text-purple-300 border-purple-500/30",
};

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [tierFilter, setTierFilter] = React.useState("all");
  const [selectedUser, setSelectedUser] = React.useState<typeof users[0] | null>(null);
  const [viewOpen, setViewOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [suspendOpen, setSuspendOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  const filtered = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;
    const matchesTier = tierFilter === "all" || u.tier === tierFilter;
    return matchesSearch && matchesStatus && matchesTier;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    suspended: users.filter((u) => u.status === "suspended").length,
    pending: users.filter((u) => u.status === "pending").length,
    totalVolume: users.reduce((acc, u) => acc + u.tradingVolume, 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage and monitor all registered traders on the platform</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-border">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Mail className="h-4 w-4 mr-2" />
            Invite User
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Users</p>
            <p className="text-2xl font-bold text-white mt-2">{stats.total.toLocaleString()}</p>
            <p className="text-xs text-primary mt-1">+12% this month</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Active</p>
            <p className="text-2xl font-bold text-primary mt-2">{stats.active}</p>
            <p className="text-xs text-muted-foreground mt-1">{((stats.active / stats.total) * 100).toFixed(0)}% of total</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Suspended</p>
            <p className="text-2xl font-bold text-red-400 mt-2">{stats.suspended}</p>
            <p className="text-xs text-muted-foreground mt-1">Review needed</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Pending KYC</p>
            <p className="text-2xl font-bold text-yellow-400 mt-2">{stats.pending + users.filter((u) => u.kyc === "pending").length}</p>
            <p className="text-xs text-muted-foreground mt-1">Awaiting review</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Volume</p>
            <p className="text-2xl font-bold text-white mt-2">${(stats.totalVolume / 1000).toFixed(0)}K</p>
            <p className="text-xs text-primary mt-1">Trading volume</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary/50 border-border"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-secondary/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={tierFilter} onValueChange={setTierFilter}>
                <SelectTrigger className="w-[140px] bg-secondary/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Pro">Pro</SelectItem>
                  <SelectItem value="Elite">Elite</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="border-border">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border bg-secondary/30 hover:bg-secondary/30">
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wide">User</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wide">Status</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wide">Tier</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wide">KYC</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wide">Account</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wide">Volume</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wide">Last Active</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase tracking-wide text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((user) => (
                  <TableRow key={user.id} className="border-border hover:bg-secondary/20">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                            {user.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[user.status]} variant="outline">
                        {user.status === "active" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                        {user.status === "suspended" && <Ban className="h-3 w-3 mr-1" />}
                        {user.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={tierColors[user.tier]} variant="outline">
                        <Shield className="h-3 w-3 mr-1" />
                        {user.tier}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={kycColors[user.kyc]} variant="outline">
                        {user.kyc}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-white">{user.accountType}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-semibold text-white">${(user.tradingVolume / 1000).toFixed(0)}K</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-muted-foreground">{user.lastActive}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border">
                          <DropdownMenuLabel className="text-xs text-muted-foreground">Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-border" />
                          <DropdownMenuItem
                            onClick={() => { setSelectedUser(user); setViewOpen(true); }}
                            className="cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => { setSelectedUser(user); setEditOpen(true); }}
                            className="cursor-pointer"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => { setSelectedUser(user); setSuspendOpen(true); }}
                            className="cursor-pointer text-red-400 focus:text-red-400"
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            {user.status === "active" ? "Suspend User" : "Activate User"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-muted-foreground">
              Showing <span className="text-white">{(page - 1) * pageSize + 1}</span> to <span className="text-white">{Math.min(page * pageSize, filtered.length)}</span> of <span className="text-white">{filtered.length}</span> users
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="border-border"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-white px-3">Page {page} of {totalPages}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="border-border"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View User Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="bg-card border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">User Profile</DialogTitle>
            <DialogDescription className="text-muted-foreground">Complete account information</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-border">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/20 text-primary text-xl font-bold">
                    {selectedUser.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-white">{selectedUser.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={statusColors[selectedUser.status]} variant="outline">{selectedUser.status}</Badge>
                    <Badge className={tierColors[selectedUser.tier]} variant="outline">{selectedUser.tier}</Badge>
                    <Badge className={kycColors[selectedUser.kyc]} variant="outline">KYC: {selectedUser.kyc}</Badge>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground uppercase">Account Type</p>
                  <p className="text-sm text-white font-medium mt-1">{selectedUser.accountType}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground uppercase">Country</p>
                  <p className="text-sm text-white font-medium mt-1">{selectedUser.country}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground uppercase">Joined</p>
                  <p className="text-sm text-white font-medium mt-1">{selectedUser.joined}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground uppercase">Last Active</p>
                  <p className="text-sm text-white font-medium mt-1">{selectedUser.lastActive}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30 border border-border col-span-2">
                  <p className="text-xs text-muted-foreground uppercase">Trading Volume</p>
                  <p className="text-2xl text-white font-bold mt-1">${selectedUser.tradingVolume.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewOpen(false)} className="border-border">Close</Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Open Full Profile</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-white">Edit User</DialogTitle>
            <DialogDescription className="text-muted-foreground">Update user information and permissions</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="text-muted-foreground text-xs">Full Name</Label>
                <Input id="edit-name" defaultValue={selectedUser.name} className="bg-secondary/50 border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email" className="text-muted-foreground text-xs">Email</Label>
                <Input id="edit-email" defaultValue={selectedUser.email} type="email" className="bg-secondary/50 border-border" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="edit-tier" className="text-muted-foreground text-xs">Tier</Label>
                  <Select defaultValue={selectedUser.tier}>
                    <SelectTrigger className="bg-secondary/50 border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Pro">Pro</SelectItem>
                      <SelectItem value="Elite">Elite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status" className="text-muted-foreground text-xs">Status</Label>
                  <Select defaultValue={selectedUser.status}>
                    <SelectTrigger className="bg-secondary/50 border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)} className="border-border">Cancel</Button>
            <Button onClick={() => setEditOpen(false)} className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend Confirmation */}
      <Dialog open={suspendOpen} onOpenChange={setSuspendOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-white">{selectedUser?.status === "active" ? "Suspend User" : "Activate User"}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {selectedUser?.status === "active"
                ? "This will prevent the user from accessing their account and trading."
                : "This will restore the user's access to the platform."}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="p-3 rounded-lg bg-secondary/30 border border-border">
              <p className="text-sm text-white font-medium">{selectedUser.name}</p>
              <p className="text-xs text-muted-foreground">{selectedUser.email}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSuspendOpen(false)} className="border-border">Cancel</Button>
            <Button
              onClick={() => setSuspendOpen(false)}
              className={selectedUser?.status === "active" ? "bg-red-500 text-white hover:bg-red-600" : "bg-primary text-primary-foreground hover:bg-primary/90"}
            >
              {selectedUser?.status === "active" ? "Suspend User" : "Activate User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}