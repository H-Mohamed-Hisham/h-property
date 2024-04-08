// Config
import connectDB from "@/config/database";

// Model
import Property from "@/models/Property";

// Utils
import { getSessionUser } from "@/utils/getSessionUser";

// GET : /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const propertyId = params.id;

    const property = await Property.findById(propertyId);

    if (!property) {
      return new Response("Property Not Found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", {
      status: 500,
    });
  }
};

// DELETE : /api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    const propertyId = params.id;

    const sessionUser = await getSessionUser();

    // Check for session
    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorised Access : User ID Is Required", {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const property = await Property.findById(propertyId);

    if (!property) {
      return new Response("Property Not Found", {
        status: 404,
      });
    }

    // Verify ownership
    if (property.owner.toString() !== userId) {
      return new Response("Denied Access : Delete Not Allowed", {
        status: 401,
      });
    }

    // Delete
    await property.deleteOne();

    return new Response("Property Deleted Successfully", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", {
      status: 500,
    });
  }
};

// PUT : /api/properties/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const propertyId = params.id;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorised Access : User ID Is Required", {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const formData = await request.formData();

    // Access all values from amenities
    const amenities = formData.getAll("amenities");

    // Get the property to update
    const existingProperty = await Property.findById(propertyId);

    if (!existingProperty) {
      return new Response("Property Doesn't Exist", {
        status: 404,
      });
    }

    // Verify ownership
    if (existingProperty.owner.toString() !== userId) {
      return new Response("Denied Access : Edit Not Allowed", {
        status: 401,
      });
    }

    // Create propertyData object for database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    // Update property in database
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      propertyData
    );

    // return Response.redirect(
    //   `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    // );

    return new Response(JSON.stringify(updatedProperty), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", {
      status: 500,
    });
  }
};
