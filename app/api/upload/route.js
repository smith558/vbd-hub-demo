import {parse} from 'papaparse';
import {randomId} from '@mui/x-data-grid-generator';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request
export const runtime = 'edge';

export function GET() {
  return new Response(`API is running. Hello from ${process.env.VERCEL_REGION}`);
}


export async function POST(request) {
  try {
    // Assuming the CSV file is sent as 'text/csv' in the request body
    const body = await request.text();

    // Process your CSV records here
    const csvLines = extractCsv(body);
    if (csvLines.length === 0) {
      throw new Error('No valid CSV lines found');
    }

    return new Response(JSON.stringify(csvLines), {
      headers: {'Content-Type': 'application/json'}, status: 200,
    });
  } catch (error) {
    return new Response(error.toString(), {status: 500});
  }
}

function extractCsv(multipartData) {
  // Define the boundary using the first line of the input
  const boundary = multipartData.split('\r\n', 1)[0];
  // Split the content by the boundary
  const parts = multipartData.split(boundary);

  // Placeholder for CSV content
  let csvContent = '';

  // Loop through each part to find the one with the CSV
  parts.forEach(part => {
    // Check if this part contains a file with 'filename=' and 'Content-Type: text/csv'
    if (part.includes('filename=') && part.includes('Content-Type: text/csv')) {
      // Extract the CSV content
      const startOfCsv = part.indexOf('\r\n\r\n') + 4; // Start after the header
      const endOfCsv = part.lastIndexOf('\r\n') - 1; // End before the closing boundary
      csvContent = part.substring(startOfCsv, endOfCsv);
    }
  });

  // Parse the CSV content to a structured format
  let parsedCsv = parse(csvContent, {
    header: true, // Assumes the first row of CSV is the header
    fastMode: true, skipEmptyLines: true, preview: 50, dynamicTyping: true, // Automatically convert types
    transformHeader: header => header.trim(), // Trim header names
    complete: function (results) {
      results.data.forEach(row => {
        // Add an id field to each row
        row.id = randomId();
      });
    }
  });

  // Filter the array to include only objects with both latitude and longitude
  parsedCsv.data = parsedCsv.data.filter(obj => typeof obj.latitude === 'number' && typeof obj.longitude === 'number' && obj.latitude >= -90 && obj.latitude <= 90 && obj.longitude >= -180 && obj.longitude <= 180);

  // Properties to keep
  const specifiedProperties = ['id', 'vectorName', 'vectorDate', 'latitude', 'longitude', 'notes'];

  return parsedCsv.data.map(obj => {
    // Reduce the object to only have the specified properties
    const filteredObj = specifiedProperties.reduce((acc, key) => {
      if (obj.hasOwnProperty(key)) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});

    // Add or overwrite the id field
    filteredObj.id = randomId();

    return filteredObj;
  });
}
