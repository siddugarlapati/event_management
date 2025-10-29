import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Users,
  Calendar,
  DollarSign,
  Bell,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function AdminDashboard() {
  const [showRevenue, setShowRevenue] = useState(true);

  // Sample data
  const stats = [
    {
      label: "Total Bookings",
      value: "248",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Total Revenue",
      value: showRevenue ? "₹2,45,000" : "••••••",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Active Clients",
      value: "156",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      label: "Pending Requests",
      value: "23",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      client: "Sarah Johnson",
      event: "Wedding",
      date: "Feb 14, 2025",
      amount: "₹50,000",
      status: "confirmed",
    },
    {
      id: 2,
      client: "Tech Corp Inc.",
      event: "Corporate Event",
      date: "Feb 20, 2025",
      amount: "₹75,000",
      status: "pending",
    },
    {
      id: 3,
      client: "Music Lovers Club",
      event: "Concert",
      date: "Mar 5, 2025",
      amount: "₹60,000",
      status: "confirmed",
    },
    {
      id: 4,
      client: "The Johnson Family",
      event: "House Warming",
      date: "Mar 15, 2025",
      amount: "₹35,000",
      status: "pending",
    },
  ];

  const vendorRequests = [
    {
      id: 1,
      vendor: "Gourmet Catering Co.",
      booking: "Wedding - Sarah Johnson",
      status: "pending",
      date: "2025-02-10",
    },
    {
      id: 2,
      vendor: "Elegant Decorations",
      booking: "Corporate Event - Tech Corp",
      status: "accepted",
      date: "2025-02-11",
    },
    {
      id: 3,
      vendor: "Lens & Light Photography",
      booking: "Wedding - Sarah Johnson",
      status: "pending",
      date: "2025-02-10",
    },
  ];

  const notifications = [
    { id: 1, message: "New booking from Emma & Michael", time: "2 hours ago", type: "info" },
    { id: 2, message: "Payment received: ₹50,000", time: "4 hours ago", type: "success" },
    { id: 3, message: "Vendor request pending approval", time: "6 hours ago", type: "warning" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Admin Header */}
      <div className="bg-white border-b border-border sticky top-16 z-40">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRevenue(!showRevenue)}
              className="border-primary text-primary hover:bg-primary/5"
            >
              {showRevenue ? (
                <>
                  <EyeOff size={16} className="mr-2" />
                  Hide Revenue
                </>
              ) : (
                <>
                  <Eye size={16} className="mr-2" />
                  Show Revenue
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-background py-8">
        <div className="container max-w-7xl mx-auto px-4 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="luxury-card">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className={`${stat.bgColor} p-3 rounded-lg`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Bookings */}
              <div className="luxury-card space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">Recent Bookings</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:bg-primary/5"
                  >
                    View All
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-3 px-4 font-bold text-foreground">
                          Client
                        </th>
                        <th className="text-left py-3 px-4 font-bold text-foreground">
                          Event
                        </th>
                        <th className="text-left py-3 px-4 font-bold text-foreground">
                          Date
                        </th>
                        <th className="text-left py-3 px-4 font-bold text-foreground">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 font-bold text-foreground">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-border hover:bg-card">
                          <td className="py-3 px-4 text-foreground">{booking.client}</td>
                          <td className="py-3 px-4 text-foreground">{booking.event}</td>
                          <td className="py-3 px-4 text-muted-foreground">{booking.date}</td>
                          <td className="py-3 px-4 font-bold text-foreground">
                            {booking.amount}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                booking.status === "confirmed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Vendor Requests */}
              <div className="luxury-card space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">Vendor Requests</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:bg-primary/5"
                  >
                    View All
                  </Button>
                </div>

                <div className="space-y-3">
                  {vendorRequests.map((request) => (
                    <div
                      key={request.id}
                      className="p-4 bg-card rounded-lg flex items-center justify-between hover:shadow-sm transition-shadow"
                    >
                      <div className="flex-1">
                        <p className="font-bold text-foreground">{request.vendor}</p>
                        <p className="text-sm text-muted-foreground">{request.booking}</p>
                        <p className="text-xs text-muted-foreground mt-1">{request.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            request.status === "accepted"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                        {request.status === "pending" && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                              Accept
                            </Button>
                            <Button size="sm" variant="outline">
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Notifications */}
              <div className="luxury-card space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-foreground">Notifications</h3>
                </div>

                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="p-3 bg-card rounded-lg space-y-1">
                      <p className="text-sm text-foreground">{notif.message}</p>
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                  View All
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="luxury-card space-y-3">
                <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg">
                  New Booking
                </Button>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5 rounded-lg">
                  Add Vendor
                </Button>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5 rounded-lg">
                  Generate Report
                </Button>
              </div>

              {/* Performance Metrics */}
              <div className="luxury-card space-y-4">
                <h3 className="text-lg font-bold text-foreground mb-4">Performance</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-foreground">Booking Rate</span>
                      <span className="text-sm font-bold text-primary">85%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{ width: "85%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-foreground">Client Satisfaction</span>
                      <span className="text-sm font-bold text-primary">92%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{ width: "92%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-foreground">Vendor Reliability</span>
                      <span className="text-sm font-bold text-primary">88%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{ width: "88%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
