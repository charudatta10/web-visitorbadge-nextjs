import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { API } from '../constants/API';

export interface StatusResult {
  total: number;
  today: number;
  dailyResults: DailyResult[];
}

export interface DailyResult {
  title: string;
  total: number;
}

export default function useStatus(url: string = "", user: string = "", repo: string = "") {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [today, setToday] = useState(0);
  const [daily, setDaily] = useState<DailyResult[]>([]);

  useEffect(() => {
    const getStatus = async (fallbackUrl?: string) => {
      setLoading(true);

      let query = `?path=${fallbackUrl}`;

      if (url) {
        query = `?path=${encodeURIComponent(url)}`;
      } else if (user && repo) {
        query = `?user=${user}&repo=${repo}`;
      }

      const search = document.location.search;
      if (search && fallbackUrl) {
        // Only use fallback when no url is provided
        return;
      }

      const resp = await fetch(`${process.env.NEXT_PUBLIC_VISITOR_API}${API.status}${query}`);

      if (resp && resp.ok) {
        const data: StatusResult = await resp.json();
        if (data) {
          setTotal(data.total || 0);
          setToday(data.today || 0);
          setDaily(data.dailyResults || []);
        }
      }

      setLoading(false);
    };

    if ((user && repo) || url) {
      getStatus();
    } else {
      getStatus('https://www.visitorbadge.io/')
    }
  }, [url, user, repo]);

  return {
    total,
    today,
    daily,
    loading
  };
}