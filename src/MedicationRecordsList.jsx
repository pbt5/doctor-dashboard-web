import React, { useState, useEffect } from 'react';

const MedicationRecordsList = ({ patientId }) => {
  const [records, setRecords] = useState([]);
  const [filterMedication, setFilterMedication] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [loading, setLoading] = useState(false);

  // 模擬獲取用藥紀錄
  useEffect(() => {
    // 這裡可以加入實際的 API 調用
    const mockRecords = [
      { id: 1, medication: '阿司匹林', date: '2025-10-01', time: '08:00', dosage: '1片', status: '已服用', notes: '餐後服用' },
      { id: 2, medication: '乙醐氨基酚', date: '2025-10-01', time: '20:00', dosage: '500mg', status: '已服用', notes: '' },
      { id: 3, medication: '阿司匹林', date: '2025-10-02', time: '08:00', dosage: '1片', status: '未服用', notes: '' },
      { id: 4, medication: '降壓藥', date: '2025-10-02', time: '12:00', dosage: '10mg', status: '已服用', notes: '飯前服用' },
      { id: 5, medication: '肰岛素', date: '2025-10-03', time: '18:00', dosage: '5單位', status: '已服用', notes: '注射' },
    ];
    setRecords(mockRecords);
  }, [patientId]);

  const handleSearch = () => {
    setLoading(true);
    // 模擬 API 查詢
    setTimeout(() => {
      console.log('查詢條件:', { patientId, filterMedication, filterDate });
      setLoading(false);
    }, 500);
  };

  const filteredRecords = records.filter(record => {
    const matchMedication = !filterMedication || record.medication.toLowerCase().includes(filterMedication.toLowerCase());
    const matchDate = !filterDate || record.date === filterDate;
    return matchMedication && matchDate;
  });

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '20px' }}>
      <h2>用藥紀錄查詢</h2>
      <p style={{ color: '#666', fontSize: '14px' }}>患者ID: {patientId}</p>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h3 style={{ marginTop: 0 }}>搜索條件</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>藥物名稱:</label>
            <input
              type="text"
              value={filterMedication}
              onChange={(e) => setFilterMedication(e.target.value)}
              placeholder="輸入藥物名稱"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>日期:</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            style={{ padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {loading ? '查詢中...' : '搜索'}
          </button>
        </div>
      </div>

      <div>
        <h3>紀錄列表 (共 {filteredRecords.length} 筆)</h3>
        {filteredRecords.length === 0 ? (
          <p style={{ color: '#999', fontStyle: 'italic', textAlign: 'center', padding: '20px' }}>無符合條件的紀錄</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f0f0f0' }}>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>藥物</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>日期</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>時間</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>劑量</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>狀態</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>備註</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map(record => (
                  <tr key={record.id} style={{ backgroundColor: record.status === '已服用' ? '#e8f5e9' : '#fff3e0' }}>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{record.medication}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{record.date}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{record.time}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{record.dosage}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: record.status === '已服用' ? '#4CAF50' : '#FF9800',
                        color: 'white',
                        fontSize: '12px'
                      }}>
                        {record.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{record.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#1565c0' }}>
          <strong>提示:</strong> 您可以使用上方搜索框篩選藥物名稱或日期來查看特定的用藥紀錄。
        </p>
      </div>
    </div>
  );
};

export default MedicationRecordsList;
