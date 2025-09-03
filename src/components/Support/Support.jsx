// import React, { useState } from "react";
// import "./Support.css";

// const sections = [
//     {
//         title: "Returns & Exchanges",
//         content: `
// We want you to love your purchase! If you're not completely satisfied, you may return or exchange your item within *14 days* of delivery.

// *Eligibility:*
// - Item must be unused, unwashed, and in original packaging.
// - Custom or personalized items are not eligible for return unless defective.

// *Process:*
// 1. Contact our support team at support@fangearcentral.com with your order number.
// 2. We'll send you a return form and shipping instructions.
// 3. Ship the item back using a trackable method.

// *Refunds:*
// - Refunds will be processed within 5-7 business days after receiving your return.
// - Shipping fees are non-refundable unless the return is due to our error.
// `
//     },
//     {
//         title: "Shipping Policy",
//         content: `
// We work hard to get your gear to you as quickly as possible.

// *Processing Time:*
// - Orders are processed within 1-3 business days.
// - Custom jersey orders may take up to 7-10 days to produce.

// *Delivery Time:*
// - Domestic (Nigeria): 2-5 business days.
// - International: 7-15 business days.

// *Carriers:*
// We use DHL, FedEx, and other reliable courier services. You'll receive a tracking number once your order ships.

// *International Orders:*
// Customs fees or import duties may apply, and are the responsibility of the customer.
// `
//     },
//     {
//         title: "FAQs",
//         content: `
// *Q: How do I place an order?*  
// A: Simply browse our store, add items to your cart, and checkout securely online.

// *Q: Can I customize my jersey?*  
// A: Yes! You can add your name, number, and preferred colors during checkout.

// *Q: Do you ship internationally?*  
// A: Yes, we ship worldwide using trusted courier partners.

// *Q: How can I track my order?*  
// A: ' receive an email with a tracking link once your order ships.

// *Q: What payment methods do you accept?*  
// A: We accept credit/debit cards, PayPal, and bank transfers.
// `
//     },
//     {
//         title: "Careers",
//         content: `
// Join the Fan Gear Central team and help us bring fans closer to their passion!

// *Why Work With Us:*
// - Fun, sports-inspired work culture.
// - Opportunity to work with an international fanbase.
// - Flexible work arrangements for some roles.

// *Current Openings:*
// - Social Media Manager
// - Customer Service Representative
// - Graphic Designer (Sports Merchandise)

// To apply, send your CV and portfolio (if applicable) to careers@fangearcentral.com.
// `
//     }
// ];

// const SupportPage = () => {
//     const [activeIndex, setActiveIndex] = useState(null);

//     const toggleSection = (index) => {
//         setActiveIndex(activeIndex === index ? null : index);
//     };

//     return (
//         <div className="support-page">
//             <h1>Support Center</h1>
//             <p className="intro">
//                 Find everything you need to know about shopping with Fan Gear Central.
//                 Click a section to read more.
//             </p>
//             {sections.map((section, index) => (
//                 <div key={index} className="support-section">
//                     <h2 onClick={() => toggleSection(index)}>
//                         {section.title}
//                     </h2>
//                     {activeIndex === index && (
//                         <div className="content">
//                             {section.content.split("\n").map((line, i) => (
//                                 <p key={i}>{line}</p>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default SupportPage;

import React, { useState } from "react";
import "./Support.css";

const sections = [
    {
        title: "About Us",
        content: `
Fan Gear Central is your ultimate destination for premium sports merchandise.  
We cater to passionate fans who want to represent their favorite teams in style.

*Our Mission:*  
To bring fans closer to their passion by providing high-quality, customizable sports gear.

*What We Offer:*  
- Official and custom jerseys.  
- Sports-inspired apparel and accessories.  
- Worldwide delivery with trusted courier partners.

*Why Choose Us:*  
We combine quality, style, and fast delivery to ensure every fan can showcase their pride.
`
    },
    {
        title: "Returns & Exchanges",
        content: `
We want you to love your purchase! If you're not completely satisfied, you may return or exchange your item within *14 days* of delivery.

*Eligibility:*
- Item must be unused, unwashed, and in original packaging.
- Custom or personalized items are not eligible for return unless defective.

*Process:*
1. Contact our support team at support@fangearcentral.com with your order number.
2. We'll send you a return form and shipping instructions.
3. Ship the item back using a trackable method.

*Refunds:*
- Refunds will be processed within 5-7 business days after receiving your return.
- Shipping fees are non-refundable unless the return is due to our error.
`
    },
    {
        title: "Shipping Policy",
        content: `
We work hard to get your gear to you as quickly as possible.

*Processing Time:*
- Orders are processed within 1-3 business days.
- Custom jersey orders may take up to 7-10 days to produce.

*Delivery Time:*
- Domestic (Nigeria): 2-5 business days.
- International: 7-15 business days.

*Carriers:*
We use DHL, FedEx, and other reliable courier services. You'll receive a tracking number once your order ships.

*International Orders:*
Customs fees or import duties may apply, and are the responsibility of the customer.
`
    },
    {
        title: "FAQs",
        content: `
*Q: How do I place an order?*  
A: Simply browse our store, add items to your cart, and checkout securely online.

*Q: Can I customize my jersey?*  
A: Yes! You can add your name, number, and preferred colors during checkout.

*Q: Do you ship internationally?*  
A: Yes, we ship worldwide using trusted courier partners.

*Q: How can I track my order?*  
A: You'll receive an email with a tracking link once your order ships.

*Q: What payment methods do you accept?*  
A: We accept credit/debit cards, PayPal, and bank transfers.
`
    },
    {
        title: "Careers",
        content: `
Join the Fan Gear Central team and help us bring fans closer to their passion!

*Why Work With Us:*
- Fun, sports-inspired work culture.
- Opportunity to work with an international fanbase.
- Flexible work arrangements for some roles.

*Current Openings:*
- Social Media Manager
- Customer Service Representative
- Graphic Designer (Sports Merchandise)

To apply, send your CV and portfolio (if applicable) to careers@fangearcentral.com.
`
    }
];

const SupportPage = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleSection = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="support-page">
            <h1>Support Center</h1>
            <p className="intro">
                Find everything you need to know about shopping with Fan Gear Central.
                Click a section to read more.
            </p>
            {sections.map((section, index) => (
                <div key={index} className="support-section">
                    <h2 onClick={() => toggleSection(index)}>
                        {section.title}
                    </h2>
                    {activeIndex === index && (
                        <div className="content">
                            {section.content.split("\n").map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SupportPage;
