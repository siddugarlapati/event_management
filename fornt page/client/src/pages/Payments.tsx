import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Lock, Shield, Wallet, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const paymentMethods = [
  { id: "card", name: "Credit/Debit Card", icon: "💳" },
  { id: "upi", name: "UPI", icon: "📱" },
  { id: "stripe", name: "Stripe", icon: "⚡" },
  { id: "razorpay", name: "Razorpay", icon: "🔐" },
  { id: "metamask", name: "MetaMask (Crypto)", icon: "🦊" },
];

export default function Payments() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod || !amount) {
      toast.error("Please select a payment method and enter an amount.");
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success(`Payment of ₹${amount} processed successfully via ${selectedMethod}!`);
      setAmount("");
      setSelectedMethod(null);
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-12 gradient-blush">
        <div className="container max-w-6xl mx-auto px-4 text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            Secure Payments
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Multiple payment options for your convenience and security.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Trust Badges */}
              <div className="luxury-card space-y-4">
                <h3 className="text-lg font-bold text-foreground">Security & Trust</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm font-bold text-foreground">SSL Encrypted</p>
                      <p className="text-xs text-muted-foreground">256-bit encryption</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Lock className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm font-bold text-foreground">PCI Compliant</p>
                      <p className="text-xs text-muted-foreground">Industry standard</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm font-bold text-foreground">Verified</p>
                      <p className="text-xs text-muted-foreground">Payment certified</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground">Select Payment Method</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="text-3xl mb-2">{method.icon}</div>
                      <p className="font-bold text-foreground text-left">{method.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Form */}
              {selectedMethod && (
                <form onSubmit={handlePayment} className="luxury-card space-y-6">
                  <h3 className="text-lg font-bold text-foreground">Payment Details</h3>

                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      Amount (₹) *
                    </label>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      min="1"
                      required
                      className="rounded-lg"
                    />
                  </div>

                  {selectedMethod === "card" && (
                    <>
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-2">
                          Card Number *
                        </label>
                        <Input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="rounded-lg"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-foreground mb-2">
                            Expiry Date *
                          </label>
                          <Input
                            type="text"
                            placeholder="MM/YY"
                            maxLength={5}
                            className="rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-foreground mb-2">
                            CVV *
                          </label>
                          <Input
                            type="text"
                            placeholder="123"
                            maxLength={3}
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {selectedMethod === "upi" && (
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">
                        UPI ID *
                      </label>
                      <Input
                        type="text"
                        placeholder="yourname@upi"
                        className="rounded-lg"
                      />
                    </div>
                  )}

                  {selectedMethod === "metamask" && (
                    <div className="bg-accent/10 p-4 rounded-lg">
                      <p className="text-sm text-foreground">
                        MetaMask wallet connection will be initiated. Ensure you have MetaMask installed.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-3 font-bold"
                  >
                    {isProcessing ? "Processing..." : `Pay ₹${amount || "0"}`}
                    {!isProcessing && <ArrowRight className="ml-2 w-4 h-4" />}
                  </Button>
                </form>
              )}
            </div>

            {/* Wallet & Invoice Summary */}
            <div className="space-y-6">
              {/* Wallet */}
              <div className="luxury-card space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Wallet className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold text-foreground">Wallet</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Available Balance</span>
                    <span className="text-2xl font-bold text-primary">₹5,000</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Total Spent</span>
                    <span className="text-foreground">₹12,500</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Transactions</span>
                    <span className="text-foreground">8</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/5 rounded-lg mt-4"
                >
                  Add Funds
                </Button>
              </div>

              {/* Recent Invoices */}
              <div className="luxury-card space-y-4">
                <h3 className="text-lg font-bold text-foreground">Recent Invoices</h3>
                <div className="space-y-3">
                  {[
                    { id: "INV-001", amount: "₹5,000", date: "Jan 15, 2025", status: "Paid" },
                    { id: "INV-002", amount: "₹7,500", date: "Jan 10, 2025", status: "Paid" },
                    { id: "INV-003", amount: "₹3,200", date: "Jan 5, 2025", status: "Pending" },
                  ].map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex justify-between items-center p-3 bg-card rounded-lg"
                    >
                      <div>
                        <p className="font-bold text-foreground text-sm">{invoice.id}</p>
                        <p className="text-xs text-muted-foreground">{invoice.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{invoice.amount}</p>
                        <p
                          className={`text-xs font-semibold ${
                            invoice.status === "Paid"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {invoice.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/5 rounded-lg"
                >
                  View All Invoices
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 gradient-lavender">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Is my payment information secure?",
                a: "Yes, all payments are processed through secure, encrypted channels with industry-standard PCI compliance.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept Credit/Debit Cards, UPI, Stripe, Razorpay, and MetaMask for cryptocurrency payments.",
              },
              {
                q: "Can I get a refund?",
                a: "Refunds are processed within 5-7 business days. Please contact our support team for refund requests.",
              },
              {
                q: "Is there a transaction fee?",
                a: "No additional fees are charged by ArtCulture. Some payment gateways may have their own fees.",
              },
            ].map((item, idx) => (
              <div key={idx} className="luxury-card">
                <h4 className="font-bold text-foreground mb-2">{item.q}</h4>
                <p className="text-muted-foreground text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
