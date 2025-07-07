'use client';

import { useEffect, useState } from 'react';

interface ClientDateProps {
  date: string;
}

export default function ClientDate({ date }: ClientDateProps) {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    setFormattedDate(new Date(date).toLocaleDateString());
  }, [date]);

  if (!formattedDate) {
    return <span>{date}</span>; // Fallback to original date string
  }

  return <span>{formattedDate}</span>;
}