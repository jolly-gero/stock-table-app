"use client";

import { useState } from "react";
import Dropdown from "@/components/drop-down";

interface SearchFormProps {
  onSearch: (
    startDate: string,
    endDate: string,
    period: string,
    status: string
  ) => void;
  onReset: () => void;
}

export default function SearchForm({ onSearch, onReset }: SearchFormProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [period, setPeriod] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate || endDate || status || period) {
      onSearch(startDate, endDate, period, status);
    }
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setPeriod("");
    setStatus("");
    onReset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-black p-4 rounded shadow mb-4 flex flex-col md:flex-row gap-4 flex-center justify-center"
    >
      <div>
        <Dropdown
          label="Period"
          options={["Transmission"]}
          onChange={(value) => {
            console.log("dropdown value: ", value);
            setPeriod(value);
          }}
          selectedValue={period}
        />
      </div>
      <div>
        <Dropdown
          label="Status"
          options={["Waiting"]}
          onChange={(value) => {
            console.log("dropdown value: ", value);
            setStatus(value);
          }}
          selectedValue={status}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">From</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">To</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>
      <div className="flex items-end gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
