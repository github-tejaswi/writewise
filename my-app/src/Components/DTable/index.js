import React, { useState } from 'react';
import './index.css';

const DTable = ({ content }) => {
  const [editableId, setEditableId] = useState('');
  const [data, setData] = useState(content);

  const handleEdit = (id) => {
    console.log(`Edit row with id ${id}`);
    setEditableId(id);
  };

  const handleSave = (id) => {
    console.log(`Save row with id ${id}`);
    setEditableId('');
    // Save functionality logic here if needed
  };

  const handleChange = (event, id) => {
    const newData = data.map((item) =>
      item.id === id ? { ...item, [event.target.name]: event.target.value } : item
    );
    setData(newData);
  };

  return (
    <div className="table-container">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {data.length > 0 && Object.keys(data[0]).map((key) => (
                <th align="center" key={key}>{key}</th>
              ))}
              <th align="center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {Object.keys(row).map((key) => (
                  <td align="center" key={key} className="minWidth">
                    {editableId === row.id && key !== 'id' ? (
                      <input
                        type="text"
                        className="minWidth"
                        name={key}
                        value={row[key]}
                        onChange={(e) => handleChange(e, row.id)}
                      />
                    ) : (
                      <span>{row[key]}</span>
                    )}
                  </td>
                ))}
                <td>
                  {editableId !== row.id ? (
                    <button className="btn btn-writewise edit-button" onClick={() => handleEdit(row.id)}>
                      Edit
                    </button>
                  ) : (
                    <button className="btn btn-writewise save-button" onClick={() => handleSave(row.id)}>
                      Save
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DTable;
