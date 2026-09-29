'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tour, BookingOrder } from '@/types';

interface BookingContextType {
  selectedTour: Tour | null;
  isModalOpen: boolean;
  modalTab: 'details' | 'book';
  setModalTab: (tab: 'details' | 'book') => void;
  openBookingModal: (tour: Tour, tab?: 'details' | 'book') => void;
  closeBookingModal: () => void;
  currentOrder: BookingOrder | null;
  setCurrentOrder: (order: BookingOrder | null) => void;
  recentOrders: BookingOrder[];
  addRecentOrder: (order: BookingOrder) => void;
  updateRecentOrderStatus: (orderCode: number, status: 'PENDING' | 'PAID' | 'CANCELLED') => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'details' | 'book'>('book');
  const [currentOrder, setCurrentOrder] = useState<BookingOrder | null>(null);
  const [recentOrders, setRecentOrders] = useState<BookingOrder[]>([]);

  // Load recent orders from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('hg_recent_orders');
      if (stored) {
        setRecentOrders(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading recent orders from storage:', e);
    }
  }, []);

  const addRecentOrder = (order: BookingOrder) => {
    setRecentOrders((prev) => {
      const filtered = prev.filter((o) => o.orderCode !== order.orderCode);
      const updated = [order, ...filtered].slice(0, 10);
      try {
        localStorage.setItem('hg_recent_orders', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving recent orders:', e);
      }
      return updated;
    });
  };

  const updateRecentOrderStatus = (orderCode: number, status: 'PENDING' | 'PAID' | 'CANCELLED') => {
    setRecentOrders((prev) => {
      const updated = prev.map((o) => {
        if (o.orderCode === orderCode) {
          return {
            ...o,
            status,
            paidAt: status === 'PAID' ? new Date().toISOString() : o.paidAt,
          };
        }
        return o;
      });
      try {
        localStorage.setItem('hg_recent_orders', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving recent orders:', e);
      }
      return updated;
    });
  };

  const openBookingModal = (tour: Tour, tab: 'details' | 'book' = 'book') => {
    setSelectedTour(tour);
    setModalTab(tab);
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedTour,
        isModalOpen,
        modalTab,
        setModalTab,
        openBookingModal,
        closeBookingModal,
        currentOrder,
        setCurrentOrder,
        recentOrders,
        addRecentOrder,
        updateRecentOrderStatus,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
