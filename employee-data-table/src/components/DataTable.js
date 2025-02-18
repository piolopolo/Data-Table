import React, { useState, useEffect } from 'react';

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/employees')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleChange = (e, index, field) => {
    const newData = [...data];
    newData[index][field] = e.target.value;
    setData(newData);
  };

  const handleSave = () => {
    fetch('/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          console.log('Data saved successfully');
        } else {
          console.error('Error saving data');
        }
      })
      .catch(error => console.error('Error saving data:', error));
  };

  const handleAddRow = async () => {
    const newId = await fetch('/api/generate-objectid')
      .then(response => response.text())
      .then(id => id)
      .catch(error => {
        console.error('Error generating ObjectID:', error);
        return 'error-id';
      });

    const newRow = { id: newId, name: '', position: '', salary: 0 };
    setData([...data, newRow]);
  };

  const handleDeleteRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  return (
    <div>
      <button onClick={handleSave}>Simpan</button>
      <button onClick={handleAddRow}>Tambah Baris</button>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Posisi</th>
            <th>Gaji</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id}>
              <td>
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) => handleChange(e, index, 'name')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.position}
                  onChange={(e) => handleChange(e, index, 'position')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.salary}
                  onChange={(e) => handleChange(e, index, 'salary')}
                />
              </td>
              <td>
                <button onClick={() => handleDeleteRow(index)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
