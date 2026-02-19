// components/TripSection.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TicketCard, { BusTicketProps } from "./TicketCard";
import { formatDate, formatDateTime } from "./hooks/TicketHelpers";

export default function TripSection({
  date,
  tickets,
  idx,
  status,
}: {
  date: string;
  tickets: BusTicketProps[];
  idx: number;
  status: any;
}) {
  const tripRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  // helper: remove unsupported colors before capture
const sanitizeForCanvas = (element: HTMLElement) => {
  const all = element.querySelectorAll("*");

  all.forEach((el) => {
    const htmlEl = el as HTMLElement;

    // remove Tailwind gradients / fancy colors
    htmlEl.style.backgroundImage = "none";

    const style = getComputedStyle(htmlEl);

    if (style.color.includes("lab") || style.color.includes("oklch")) {
      htmlEl.style.color = "#000";
    }

    if (
      style.backgroundColor.includes("lab") ||
      style.backgroundColor.includes("oklch")
    ) {
      htmlEl.style.backgroundColor = "#fff";
    }

    if (style.borderColor.includes("lab") || style.borderColor.includes("oklch")) {
      htmlEl.style.borderColor = "#000";
    }
  });
};


  // DOWNLOAD PDF
  const handleDownloadPDF = async () => {
  if (!tripRef.current) return;

  const html2canvas = (await import("html2canvas")).default;
  const jsPDF = (await import("jspdf")).default;

  sanitizeForCanvas(tripRef.current); // 🔥 important

  const canvas = await html2canvas(tripRef.current, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfW = pdf.internal.pageSize.getWidth();
  const imgH = (canvas.height * pdfW) / canvas.width;
  const pdfH = pdf.internal.pageSize.getHeight();

  let heightLeft = imgH;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, pdfW, imgH);
  heightLeft -= pdfH;

  while (heightLeft > 0) {
    position = heightLeft - imgH;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, pdfW, imgH);
    heightLeft -= pdfH;
  }

  pdf.save(`Tickets-${date}.pdf`);
};


  // DOWNLOAD IMAGE
 const handleDownloadImage = async () => {
  if (!tripRef.current) return;

  const html2canvas = (await import("html2canvas")).default;

  sanitizeForCanvas(tripRef.current); // 🔥 important

  const canvas = await html2canvas(tripRef.current, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const link = document.createElement("a");
  link.download = `Tickets-${date}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
};


  // COLORS
  const light = [
    "bg-red-100",
    "bg-green-100",
    "bg-blue-100",
    "bg-yellow-100",
    "bg-purple-100",
  ];
  const dark = [
    "bg-red-700",
    "bg-green-700",
    "bg-blue-700",
    "bg-yellow-700",
    "bg-purple-700",
  ];

  const bgColor =
    status.setting?.theme === "light" ? light[idx % 5] : dark[idx % 5];

  return (
    <div
      className={`mb-4 w-margin max-w-sm sm:max-w-md mx-auto p-3 border rounded-lg ${bgColor}`}
    >
      <div className="html2canvas-reset " ref={tripRef}>
        <h2 className="font-bold text-lg mb-2 flex justify-center items-center gap-2">
          {formatDateTime(date)}
          <Image
            src={
              status.setting?.theme === "light"
                ? "/assets/icons/tiket_time.svg"
                : "/assets/icons/tiket_time_white.svg"
            }
            alt="tiket"
            width={25}
            height={25}
          />
          <span className="text-blue-400"> ={tickets.length}</span>
        </h2>

        {tickets.map((ticket, index) => (
          <TicketCard key={ticket.tiket_number || index} ticket={ticket} />
        ))}
      </div>

      {isClient && (
        <div className="flex justify-center gap-3 mt-4 print:hidden">
          <button
            onClick={handleDownloadPDF}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Download PDF
          </button>
          <button
            onClick={handleDownloadImage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
}
