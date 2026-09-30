'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import TourList from '@/components/TourList';
import GuideSection from '@/components/GuideSection';
import ReviewsSection from '@/components/ReviewsSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import MyBookingsDrawer from '@/components/MyBookingsDrawer';
import Chatbot from '@/components/Chatbot';

export default function HomePage() {
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-stone-50">
      {/* Navigation Bar */}
      <Navbar onOpenMyBookings={() => setIsMyBookingsOpen(true)} />

      {/* Hero Section */}
      <Hero />

      {/* Feature Highlights: Safety, Local Drivers, 24/7 Rescue, VietQR */}
      <Features />

      {/* Tour List with Filter, Search, and 5 Mock Tours */}
      <TourList />

      {/* Travel Guide: Seasons & Packing Checklist */}
      <GuideSection />

      {/* Customer Reviews & Testimonials */}
      <ReviewsSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* Footer with Legal Info & Offices */}
      <Footer />

      {/* Booking Drawer / Modal */}
      <BookingModal />

      {/* My Bookings History Drawer */}
      <MyBookingsDrawer
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
      />

      {/* RAG AI Travel Chatbot */}
      <Chatbot />
    </main>
  );
}
