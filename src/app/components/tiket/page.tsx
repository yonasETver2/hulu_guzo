// tiket/index.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useGlobalState } from "@/app/globalContext/GlobalState";
//import { useTripState } from "../home/hooks/useTripState";

import ActionButtons from "../commonComponent/TopActionBar/ActionButtons";
import PhoneDropdown from "../commonComponent/TopActionBar/PhoneDropdown";
import TripSection from "./TripSection";
import { BusTicketProps } from "./TicketCard";

export default function Tiket() {
  const { data: session } = useSession();
  const user_id = session?.user?.id || 0;

  const { status } = useGlobalState();
  //const { providers } = useTripState();

  //load phone and name of provider
  const [providers, setProviders] = useState<
    { transporter_name: string; transporter_name_amh: string; phone: string }[]
  >([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await fetch("/api/getProviderNamePhone"); // Your API
        const data = await res.json();

        if (Array.isArray(data)) {
          setProviders(data); // Store all providers
        }
      } catch (err) {
        console.error("Error loading providers:", err);
      }
    };

    fetchProviders();
  }, []);

  const [phoneOpen, setPhoneOpen] = useState(false);
  const handlePhoneClick = () => setPhoneOpen(!phoneOpen);

  const [tickets, setTickets] = useState<BusTicketProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // FETCH TICKETS
  useEffect(() => {
    if (!user_id) return;

    const load = async () => {
      try {
        const res = await fetch(`/api/getTiket?userId=${user_id}`);
        const data = await res.json();
        setTickets(data.success ? data.data : []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch tickets");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user_id]);

  if (loading) return <p className="text-center mt-32">Loading tickets...</p>;
  if (error) return <p className="text-center mt-32 text-red-500">{error}</p>;
  if (!tickets.length)
    return <p className="text-center mt-32">No tickets found</p>;

  const normalizeDateTime = (date?: string | Date | null | number): string => {
    if (!date) return "N/A";

    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return "N/A";

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
  };

  // GROUP BY DATE
  const grouped = tickets.reduce((acc: any, ticket) => {
    const key = normalizeDateTime(ticket.tiketed_date);
    if (!acc[key]) acc[key] = [];
    acc[key].push(ticket);
    return acc;
  }, {});

  const sequenceTickets = Object.entries(grouped).map(([date, items]: any) => ({
    date,
    tickets: items.map((t: BusTicketProps, i: number) => ({
      ...t,
      sequence: i + 1,
      total: items.length,
    })),
  }));

  return (
    <div className="space-y-12 md:mb-30">
      {/* TOP BAR */}
      <div
        className={`fixed top-16 left-0 w-full p-4 shadow-md ${
          status.setting?.theme === "light" ? "bg-gray-50" : "bg-gray-700"
        } flex justify-between items-center z-30`}
      >
        <ActionButtons
          status={status}
          handlePhoneClick={handlePhoneClick}
          action={2}
          place={3}
        />
        <PhoneDropdown
          phoneOpen={phoneOpen}
          providers={providers}
          status={status}
          onClose={() => setPhoneOpen(false)}
        />
      </div>

      {/* CONTENT */}
      <div className="mt-20 ">
        {sequenceTickets.map(({ date, tickets }, idx) => (
          <TripSection
            key={`${date}-${tickets[0]?.bus_code}-${tickets[0]?.travel_time}`}
            date={date}
            tickets={tickets}
            idx={idx}
            status={status}
          />
        ))}
      </div>
    </div>
  );
}
