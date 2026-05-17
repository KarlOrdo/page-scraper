import { NextResponse } from "next/server";
import * as cheerio from 'cheerio';

export async function POST(req) {
    
    const body = await req.json();
    const url = body.url;

    if(!url) return NextResponse.json({error: "No URL provided"}, {status:400});

    const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)'
    }});
    
    if(!res) return NextResponse.json({error: "Failed to scraper the website"}, {status:502});

    const rawHTML = await res.text();
    const $ = cheerio.load(rawHTML);
    
    const filteredHTML = [];

    $("h1, h2, h3, h4, p, li").each((i, el) => {
        const text = $(el).text().trim();
        if(text.length > 5){
            filteredHTML.push(text);
        }
    })

    return NextResponse.json({filteredHTML});
}
