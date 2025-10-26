// src/components/Faq.js
import React, { useState } from 'react';

const faqData = [
    {
        question: "What services do you offer?",
        answer: "We offer a comprehensive range of services including web development, mobile app development, UI/UX design, and digital consulting. Our team of experts works closely with clients to deliver customized solutions that meet their specific business needs."
    },
    {
        question: "How long does a typical project take?",
        answer: "Project timelines vary depending on complexity and scope. A simple website may take 2-4 weeks, while a complex web application or mobile app can take 3-6 months. We provide detailed timelines during the initial consultation and keep you updated throughout the development process."
    },
    {
        question: "What is your pricing structure?",
        answer: "We offer flexible pricing options including fixed-price projects, hourly rates, and retainer agreements. The cost depends on project requirements, complexity, and timeline. Contact us for a free consultation and custom quote tailored to your specific needs."
    },
    {
        question: "Do you provide ongoing support and maintenance?",
        answer: "Yes! We offer comprehensive support and maintenance packages to ensure your application runs smoothly. This includes bug fixes, security updates, performance optimization, and feature enhancements. We're committed to your long-term success."
    },
    {
        question: "Can you work with existing projects or only new ones?",
        answer: "We work with both new and existing projects. Whether you need to build something from scratch, modernize a legacy application, or add new features to an existing platform, our team has the expertise to help you succeed."
    },
    {
        question: "What technologies do you specialize in?",
        answer: "We specialize in modern technologies including React, Vue.js, Node.js, Python, Swift, Kotlin, and various cloud platforms. Our team stays updated with the latest industry trends to deliver cutting-edge solutions using the best tools for your project."
    }
];

const FaqItem = ({ item, index, openIndex, setOpenIndex }) => {
    const isActive = index === openIndex;

    const handleToggle = () => {
        setOpenIndex(isActive ? null : index); // Toggle behavior
    };

    return (
        <div className={`faq-item ${isActive ? 'active' : ''}`}>
            <button className="faq-question" onClick={handleToggle}>
                <span>{item.question}</span>
                <span className="faq-icon">+</span>
            </button>
            <div className="faq-answer">
                <p>{item.answer}</p>
            </div>
        </div>
    );
};

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="faq-section">
            <div className="faq-container">
                <h2>Frequently Asked Questions</h2>
                <p className="section-subtitle">Find answers to common questions about our services</p>
                {faqData.map((item, index) => (
                    <FaqItem
                        key={index}
                        item={item}
                        index={index}
                        openIndex={openIndex}
                        setOpenIndex={setOpenIndex}
                    />
                ))}
            </div>
        </section>
    );
};

export default Faq;