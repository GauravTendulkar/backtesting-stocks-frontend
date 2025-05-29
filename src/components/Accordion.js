"use client"
import React, { useState } from 'react';

const Accordion = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div>
            {items.map((item, index) => (
                <div key={index}>
                    <div onClick={() => toggleAccordion(index)} style={{ cursor: 'pointer', padding: '10px', background: '#f1f1f1', border: '1px solid #ccc' }}>
                        {item.title}
                    </div>
                    {openIndex === index && (
                        <div style={{ padding: '10px', border: '1px solid #ccc', borderTop: 'none' }}>
                            {item.content}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;