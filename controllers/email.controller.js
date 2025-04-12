const Property = require("../models/property.model");
const userModel = require("../models/user.model");
const bookingConfirmation = require("../utils/emailTemplate/bookingConfirmation");
const propertyBooked = require("../utils/emailTemplate/propertyBooked");
const sendEmail = require("../utils/sendEmail");

const handleEmail = async ({ emailType, user, booking, property }) => {
  try {
    // If IDs are passed, fetch the objects
    if (typeof user === "string") {
      user = await userModel.findById(user);
    }

    if (typeof property === "string") {
      property = await Property.findById(property);
    }

    if (!user || !property) throw new Error("User or Property not found");

    let subject = "";
    let htmlToUser = "";
    let htmlToAdmin = "";

    switch (emailType) {
      case "booking-confirmation":
        subject = "Your Booking is Confirmed!";
        htmlToUser = bookingConfirmation({ user, booking, property });
        await sendEmail(user.email, subject, htmlToUser);
        break;

      case "property-booked":
        subject = "New Booking Alert!";
        htmlToAdmin = propertyBooked({ user, booking, property });
        await sendEmail(process.env.ADMIN_EMAIL, subject, htmlToAdmin);
        break;

      case "both":
        await sendEmail(
          user.email,
          "Your Booking",
          bookingConfirmation({ user, booking, property })
        );
        await sendEmail(
          process.env.ADMIN_EMAIL,
          "New Booking",
          propertyBooked({ user, booking, property })
        );
        break;

      default:
        throw new Error("Invalid email type");
    }

    return { success: true, message: "Email(s) sent successfully" };
  } catch (err) {
    console.error("Email send error:", err);
    return { success: false, message: "Failed to send email", error: err };
  }
};

module.exports = handleEmail;
