import { useEffect, useState } from 'react';
import { getHistory } from '../services/api';
import HistoryItem from '../components/HistoryItem';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data } = await getHistory();
      setHistory(data);
    };
    fetchHistory();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Your Resume Analysis History</h2>
      {history.length === 0 ? (
        <p className="text-gray-500">No previous analyses yet.</p>
      ) : (
        history.map((item) => <HistoryItem key={item._id} result={item.analysisResult} />)
      )}
    </div>
  );
};

export default History;
