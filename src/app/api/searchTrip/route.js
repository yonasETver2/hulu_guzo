import { query } from "@/lib/db_hulu_guzo_user";

export async function POST(request) {
  try {
    const body = await request.json();

    // Destructure with defaults to prevent undefined
    const {
      sourceCityFirst = null,
      destinationCityFirst = null,
      tripTypeFirst = "one-way",
      dateFirst = null,
      passengerCountFirst = null,
      sourceCityRound = null,
      destinationCityRound = null,
      dateRound = null,
      passengerCountRound = null,
    } = body;

    // Validate required fields
    if (
      !sourceCityFirst ||
      !destinationCityFirst ||
      !dateFirst ||
      !passengerCountFirst
    ) {
      return new Response(
        JSON.stringify({ message: "Missing required fields for first trip" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Prepare parameters array for the procedure
    const params = [
      sourceCityFirst,
      destinationCityFirst,
      dateFirst,
      passengerCountFirst,
      sourceCityRound,
      destinationCityRound,
      dateRound,
      passengerCountRound,
    ];

    // Call the procedure and get the result
    const [rows] = await query(
      "CALL GetTripOptions(?, ?, ?, ?, ?, ?, ?, ?)",
      params
    );

    // MySQL CALL returns a nested array, so extract the trips
    const trips = Array.isArray(rows) && Array.isArray(rows[0]) ? rows[0] : rows;

    // Group trips by provider_id and trip_type
    const result = {};
    trips.forEach((trip) => {
      const providerId = trip.provider_id;
      const tripType = trip.trip_type;

      if (!result[providerId]) result[providerId] = {};
      if (!result[providerId][tripType]) result[providerId][tripType] = [];

      result[providerId][tripType].push(trip);
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
