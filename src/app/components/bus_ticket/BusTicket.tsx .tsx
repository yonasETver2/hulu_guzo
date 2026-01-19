"use client";

import React from "react";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";

interface BusTicketProps {
  ticketNumber: string;
  passengerName: string;
  seatNumber: string;
  busCode: string;
  sourceCity: string;
  destinationCity: string;
  providerLogo: string; // image path or URL
}

export default function BusTicket({
  ticketNumber,
  passengerName,
  seatNumber,
  busCode,
  sourceCity,
  destinationCity,
  providerLogo,
}: BusTicketProps) {
  return (
    <div className="max-w-md mx-auto mt-8 shadow-xl rounded-2xl border border-gray-200 bg-white">
      <div className="p-6 flex flex-col gap-4">
        {/* Header with Logo */}
        <div className="flex justify-between items-center border-b pb-3">
          <Image
            src={providerLogo}
            alt="Provider Logo"
            width={60}
            height={60}
            className="rounded-md"
          />
          <div className="text-right">
            <p className="text-xs text-gray-400">Ticket No.</p>
            <p className="text-lg font-bold">{ticketNumber}</p>
          </div>
        </div>

        {/* Passenger Info */}
        <div>
          <p className="text-gray-500 text-sm">Passenger</p>
          <p className="text-lg font-semibold">{passengerName}</p>
        </div>

        {/* Trip Info */}
        <div className="flex justify-between">
          <div>
            <p className="text-gray-500 text-sm">From</p>
            <p className="font-semibold">{sourceCity}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">To</p>
            <p className="font-semibold">{destinationCity}</p>
          </div>
        </div>

        {/* Seat & Bus Code */}
        <div className="flex justify-between">
          <div>
            <p className="text-gray-500 text-sm">Seat</p>
            <p className="font-semibold">{seatNumber}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Bus Code</p>
            <p className="font-semibold">{busCode}</p>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mt-4">
          <QRCodeCanvas value={ticketNumber} size={100} />
        </div>
      </div>
    </div>
  );
}
