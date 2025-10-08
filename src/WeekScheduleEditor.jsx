import React, { useState } from 'react';

const WeekScheduleEditor = ({ patientId }) => {
  const [schedules, setSchedules] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState('');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const addSchedule = () => {
    if (selectedMedication && selectedDay && dosage && time) {
      if (schedules.length >= 10) {
        alert('最多只能添加10種藥物排程');
        return;
      }
      const newSchedule = {
        id: Date.now(),
        medication: selectedMedication,
        day: selectedDay,
        dosage,
        time,
        patientId
      };
      setSchedules([...schedules, newSchedule]);
      setSelectedMedication('');
      setDosage('');
      setTime('');
    } else {
      alert('請填寫所有欄位');
    }
  };

  const deleteSchedule = (id) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  const handleSave = () => {
    console.log('保存排程:', schedules);
    alert('排程已保存！');
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '20px' }}>
      <h2>週間用藥排程編輯器</h2>
      <p style={{ color: '#666', fontSize: '14px' }}>患者ID: {patientId}</p>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h3 style={{ marginTop: 0 }}>新增排程 (最多10種藥物)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '10px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>藥物名稱:</label>
            <input
              type="text"
              value={selectedMedication}
              onChange={(e) => setSelectedMedication(e.target.value)}
              placeholder="輸入藥物名稱"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>星期:</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              {daysOfWeek.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>劑量:</label>
            <input
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="例: 1片"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>時間:</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        </div>
        <button
          onClick={addSchedule}
          style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
        >
          新增排程
        </button>
        <span style={{ color: '#666' }}>({schedules.length}/10 已使用)</span>
      </div>

      <div>
        <h3>當前排程列表</h3>
        {schedules.length === 0 ? (
          <p style={{ color: '#999', fontStyle: 'italic' }}>尚未添加任何排程</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>藥物</th>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>星期</th>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>劑量</th>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>時間</th>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map(schedule => (
                <tr key={schedule.id}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{schedule.medication}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{schedule.day}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{schedule.dosage}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{schedule.time}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    <button
                      onClick={() => deleteSchedule(schedule.id)}
                      style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button
        onClick={handleSave}
        style={{ marginTop: '20px', padding: '12px 24px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
        disabled={schedules.length === 0}
      >
        保存所有排程
      </button>
    </div>
  );
};

export default WeekScheduleEditor;
