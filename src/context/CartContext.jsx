"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { defaultRestaurant, getAllMenuItems } from "@/config/restaurant";

const CartContext = createContext(null);

export function CartProvider({ children, restaurant = defaultRestaurant }) {
  const [tableNumber, setTableNumberState] = useState(null);
  const [cart, setCart] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  // Storage key formula: nami_cart_{restaurantId}_table_{tableNumber || 'counter'}
  const getStorageKey = useCallback(
    (tbl) => {
      const restId = restaurant?.id || "default";
      const tblKey = tbl ? String(tbl).trim().toLowerCase() : "counter";
      return `nami_cart_${restId}_table_${tblKey}`;
    },
    [restaurant?.id]
  );

  // 1. Initial Table Parameter & Cart Hydration
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Read ?table=XX from URL query string
    const searchParams = new URLSearchParams(window.location.search);
    const tableParam = searchParams.get("table");
    const activeTable = tableParam ? tableParam.trim() : null;

    setTableNumberState(activeTable);

    // Load initial cart for this table
    try {
      const key = getStorageKey(activeTable);
      const saved = localStorage.getItem(key);
      if (saved) {
        setCart(JSON.parse(saved));
      } else {
        setCart([]);
      }
    } catch (e) {
      console.warn("Could not read cart from localStorage:", e);
    }

    setIsInitialized(true);
  }, [getStorageKey]);

  // 2. Persist Cart to LocalStorage on changes
  useEffect(() => {
    if (!isInitialized || typeof window === "undefined") return;
    try {
      const key = getStorageKey(tableNumber);
      localStorage.setItem(key, JSON.stringify(cart));
    } catch (e) {
      console.warn("Could not persist cart to localStorage:", e);
    }
  }, [cart, tableNumber, isInitialized, getStorageKey]);

  // 3. Switch Table Function (Persists previous, loads new table's cart)
  const setTableNumber = useCallback(
    (newTable) => {
      const cleaned = newTable ? String(newTable).trim() : null;
      setTableNumberState(cleaned);

      // Load cart for the newly selected table
      try {
        const key = getStorageKey(cleaned);
        const saved = localStorage.getItem(key);
        if (saved) {
          setCart(JSON.parse(saved));
        } else {
          setCart([]);
        }
      } catch (e) {
        console.warn("Could not load cart for new table:", e);
        setCart([]);
      }
    },
    [getStorageKey]
  );

  // 4. Cart Mutations with Availability Guards
  const addToCart = useCallback((dish) => {
    // Availability guard: prevent adding unavailable dishes
    if (!dish || dish.available === false) {
      return false;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: dish.id,
          name: dish.name,
          subtitle: dish.subtitle || "",
          price: Number(dish.price),
          currency: dish.currency || "USD",
          quantity: 1,
          image: dish.image || null,
          isChefSpecial: Boolean(dish.isChefSpecial),
          available: true,
        },
      ];
    });
    return true;
  }, []);

  const updateQuantity = useCallback((dishId, newQty) => {
    setCart((prev) => {
      if (newQty <= 0) {
        return prev.filter((item) => item.id !== dishId);
      }
      return prev.map((item) =>
        item.id === dishId ? { ...item, quantity: newQty } : item
      );
    });
  }, []);

  const removeFromCart = useCallback((dishId) => {
    setCart((prev) => prev.filter((item) => item.id !== dishId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    try {
      const key = getStorageKey(tableNumber);
      localStorage.removeItem(key);
    } catch (e) {}
  }, [getStorageKey, tableNumber]);

  // 5. Availability Re-validation
  // Cross-checks the current cart against the master menu to detect items that became unavailable
  const unavailableCartItems = useMemo(() => {
    const allMenu = getAllMenuItems(restaurant);
    const menuMap = new Map(allMenu.map((m) => [m.id, m]));

    return cart.filter((item) => {
      const liveItem = menuMap.get(item.id);
      return !liveItem || liveItem.available === false;
    });
  }, [cart, restaurant]);

  const removeUnavailableItems = useCallback(() => {
    const allMenu = getAllMenuItems(restaurant);
    const availableIds = new Set(
      allMenu.filter((m) => m.available !== false).map((m) => m.id)
    );
    setCart((prev) => prev.filter((item) => availableIds.has(item.id)));
  }, [restaurant]);

  // 6. Computed Totals
  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  const value = {
    restaurant,
    tableNumber,
    setTableNumber,
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    isTableModalOpen,
    setIsTableModalOpen,
    unavailableCartItems,
    removeUnavailableItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

