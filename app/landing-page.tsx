import React, { useState, useEffect } from 'react';
import { Activity, Brain, Clock, Users, Shield, TrendingUp, ArrowRight, Check, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Triage",
      description: "Intelligent patient prioritization using advanced machine learning algorithms to ensure critical cases receive immediate attention."
    },
    {
      icon: Clock,
      title: "Real-Time Analytics",
      description: "Monitor patient flow, wait times, and resource allocation with live dashboards and predictive insights."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamlessly coordinate care across departments with integrated communication and task management tools."
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security and full compliance with healthcare regulations to protect sensitive patient data."
    },
    {
      icon: TrendingUp,
      title: "Predictive Insights",
      description: "Forecast patient volumes, identify bottlenecks, and optimize staffing with AI-driven predictions."
    },
    {
      icon: Activity,
      title: "Clinical Decision Support",
      description: "Evidence-based recommendations and alerts to support clinical workflows and improve patient outcomes."
    }
  ];

  const stats = [
    { value: "40%", label: "Faster Triage Times" },
    { value: "99.9%", label: "Uptime Guarantee" },
    { value: "500+", label: "Healthcare Facilities" },
    { value: "2M+", label: "Patients Served" }
  ];

  const testimonials = [
    {
      quote: "MedFlow AI has transformed how we manage patient flow. Our emergency department efficiency increased by 35% in just three months.",
      author: "Dr. Sarah Chen",
      role: "Emergency Medicine Director",
      hospital: "Metro General Hospital"
    },
    {
      quote: "The predictive analytics help us stay ahead of surges. We can now allocate resources proactively instead of reactively.",
      author: "Michael Rodriguez",
      role: "COO",
      hospital: "Riverside Medical Center"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Animated Background Grid */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-1000"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: `translateY(${scrollY * 0.5}px)`,
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, #000 40%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Activity className="w-8 h-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">MedFlow AI</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/auth/login">
            <button className="px-6 py-2 rounded-lg bg-black text-white hover:bg-black transition shadow-lg shadow-black/30">
              Get Started
            </button>
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 z-50 p-6 shadow-lg">
          <div className="flex flex-col gap-4">
            <Link href="/auth/login">
              <button className="px-6 py-2 rounded-lg bg-black text-white hover:bg-black transition">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-32 max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 border border-black/20 text-black text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
          </span>
          Now live in 500+ healthcare facilities
        </div>

        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 text-center leading-tight">
          Intelligent Healthcare
          <span className="block bg-black bg-clip-text text-transparent">
            Workflow Management
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 text-center max-w-3xl leading-relaxed">
          Transform your clinical operations with AI-powered triage, real-time analytics, and predictive insights. 
          Reduce wait times, optimize resource allocation, and deliver better patient outcomes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/auth/login">
            <button className="group px-8 py-4 rounded-xl bg-black text-white font-semibold text-lg shadow-xl shadow-blue-600/30 hover:bg-black transition-all hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-0.5 flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative z-10 px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything you need to optimize patient flow
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed for modern healthcare environments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <feature.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="relative z-10 px-6 py-24 bg-linear-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted by healthcare leaders
            </h2>
            <p className="text-xl text-gray-600">
              See how organizations are transforming patient care
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all">
                <div className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-purple-500" />
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-gray-500">{testimonial.hospital}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-linear-to-br from-blue-600 to-purple-600 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join hundreds of healthcare facilities using MedFlow AI to deliver better, faster care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-xl bg-white text-blue-600 font-semibold text-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl">
              Start Free Trial
            </button>
            <button className="px-8 py-4 rounded-xl border-2 border-white text-white font-semibold text-lg hover:bg-white/10 transition-all">
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-6 h-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">MedFlow AI</span>
              </div>
              <p className="text-gray-600 text-sm">
                Empowering healthcare with intelligent workflow solutions.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Product</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-gray-900">Features</a></li>
                <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900">Security</a></li>
                <li><a href="#" className="hover:text-gray-900">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Company</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-gray-900">About</a></li>
                <li><a href="#" className="hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Legal</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms</a></li>
                <li><a href="#" className="hover:text-gray-900">HIPAA</a></li>
                <li><a href="#" className="hover:text-gray-900">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
            © 2025 MedFlow AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}