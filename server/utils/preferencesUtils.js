function preferencesToLanguage(preferences) {
  let prefLanguage = "";
  if (!preferences || preferences.size === 0) {
    return prefLanguage;
  }

  const descriptions = [];

  if (preferences.get("kids") !== null) {
    descriptions.push(
      preferences.get("kids") === "Yes"
        ? "family-friendly activities"
        : "activities suited for adults"
    );
  }
  if (preferences.get("pets") !== null) {
    descriptions.push(
      preferences.get("pets") === "Yes" ? "pet-friendly locations" : ""
    );
  }
  if (preferences.get("budget") !== null) {
    descriptions.push(`a budget of $${preferences.get("budget")} per day`);
  }
  if (preferences.get("peopleInParty") !== null) {
    descriptions.push(
      `accommodations for ${preferences.get("peopleInParty")} people`
    );
  }
  if (preferences.get("locationPreference") !== null) {
    descriptions.push(
      preferences.get("locationPreference") === "City"
        ? "exploring urban environments"
        : "exploring rural areas"
    );
  }
  if (preferences.get("activityPreference") !== null) {
    descriptions.push(
      `engaging in ${preferences
        .get("activityPreference")
        .toLowerCase()} activities`
    );
  }
  if (preferences.get("culinaryPreference") !== null) {
    descriptions.push(
      `enjoying ${preferences.get("culinaryPreference").toLowerCase()}`
    );
  }
  if (preferences.get("explorationPreference") !== null) {
    descriptions.push(
      preferences.get("explorationPreference") === "Guided tours"
        ? "joining guided tours"
        : "independent exploration"
    );
  }
  if (preferences.get("nightlifeImportance") !== null) {
    descriptions.push(
      preferences.get("nightlifeImportance") === "Very important"
        ? "experiencing vibrant nightlife"
        : "less focus on nightlife"
    );
  }
  if (preferences.get("culturalInterest") !== null) {
    descriptions.push(
      preferences.get("culturalInterest") === "Yes"
        ? "emphasizing local culture"
        : "less emphasis on cultural activities"
    );
  }

  if (descriptions.length > 0) {
    prefLanguage = `, and should include ${descriptions.join(", ")}.`;
  }

  return prefLanguage;
}

module.exports = preferencesToLanguage;
