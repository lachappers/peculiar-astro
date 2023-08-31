import React, { useEffect, useState } from "react";

const SERVICES = [
    {category: "Design & Build", description:[<div className="text-sm mb-4 italic">Hand-coded design & build, or migration of existing;<ul className="list-disc list-inside"><li>Brand</li><li>Site Layout & Content</li><li>Technical Configuration (including hosting & domain management <a href="/">and more</a>)</li></ul>for static site, up to 5 pages, with standard features. Including; Technical SEO & Performance Optimisation, Full Accessibility & Multi-Device Compatibility, GDPR & UK Legal Compliance, with Analytics built in. <a href="/">See More.</a></div>], name: "standard", unitPrice:"£4,500", quantity:"1"},
    {category: "Design & Build", description:"Additional pages", name: "addPage", unitPrice:"£500", quantity:"0"},
    {category: "Design & Build", description:"Additional features", name: "addFeatures", unitPrice:"£4,500", quantity:"0"},
    {category: "Manage & Support", description:"Core Support Package", name: "coreSupport", unitPrice:"£75", quantity:"12"},
    {category: "Manage & Support", description:"Enhanced Support Package", name: "enhancedSupport", unitPrice:"£150", quantity:"12"},
    {category: "Manage & Support", description:"Comprehensive Support Package", name: "comprehensiveSupport", unitPrice:"£225", quantity:"12"},
    {category: "Service Fees & Discounts", description:"Upfront payment plan", name: "upfrontDiscount", unitPrice:"", quantity:"0"}
]
function ServiceCategoryRow({category}){
    return(
        <tr >
            <th colSpan="3" className="text-lg w-full text-left border-b border-inherit">
                {category}
            </th>
        </tr>
    )
}
function ServiceRow({service}){
    return(
        <tr >
            <td>{service.description}</td>
            <td>{service.quantity}</td>
            <td>{service.unitPrice}</td>
        </tr>
    )
}

function QuoteTable({services}){
    const rows = [];
    let lastCategory =null;
    
    services.forEach((service)=>{
        if (service.category !== lastCategory){
            rows.push(
                <ServiceCategoryRow category={service.category} key={service.category} />
            );
        }
        rows.push(
            <ServiceRow service ={service} key={service.name} />
        );
        lastCategory = service.category
    })
    return (
        <table className="">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default function DraftQuote() {

    return(
        <div className="">
            <h2>Your Draft Quote</h2>
            <p>Based on what you've shared today, you quote is shared below. To accept or refine this quote, enter your email.</p>
            <QuoteTable services={SERVICES} />

        </div>
    )
}