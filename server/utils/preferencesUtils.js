function preferencesToLanguage(preferences) {
  let prefLanguage = "";
  if (!preferences || preferences.size === 0) {
    return prefLanguage;
  }

  const descriptions = [];
  if (preferences.has("kids")) {
    if (preferences.get("kids") === "Yes")
      descriptions.push("family-friendly activities");
    else if (preferences.get("kids") === "No")
      descriptions.push("activities suited for adults");
  }

  if (preferences.has("pets")) {
    if (preferences.get("pets") === "Yes")
      descriptions.push("pet-friendly locations");
  }

  if (preferences.has("budget"))
    descriptions.push(`a budget of $${preferences.get("budget")} per day`);

  if (
    preferences.has("peopleInParty") &&
    preferences.get("peopleInParty") > 1
  ) {
    descriptions.push(
      `accommodations for ${preferences.get("peopleInParty")} people`
    );
  }

  if (preferences.has("locationPreference")) {
    if (preferences.get("locationPreference") === "City")
      descriptions.push("exploring urban environments");
    if (preferences.get("locationPreference") === "Countryside")
      descriptions.push("exploring rural areas");
  }

  if (preferences.has("activityPreference")) {
    descriptions.push(
      `engaging in ${preferences
        .get("activityPreference")
        .toLowerCase()} activities`
    );
  }

  if (preferences.has("culinaryPreference")) {
    descriptions.push(
      `enjoying ${preferences.get("culinaryPreference").toLowerCase()}`
    );
  }

  if (preferences.has("explorationPreference")) {
    if (preferences.get("explorationPreference") === "Structured tours")
      descriptions.push("joining guided tours");
    else if (
      preferences.get("explorationPreference") === "Independent exploration"
    )
      descriptions.push("independent exploration");
  }

  if (preferences.has("nightlifeImportance")) {
    if (preferences.get("nightlifeImportance") === "Very important")
      descriptions.push("experiencing vibrant nightlife");
    else if (preferences.get("nightlifeImportance") === "Somewhat important")
      descriptions.push("experiencing a little bit of nightlife");
    else if (preferences.get("nightlifeImportance") === "Not important")
      descriptions.push("no emphasis on nightlife");
  }

  if (preferences.has("culturalInterest")) {
    if (preferences.get("culturalInterest") === "Yes")
      descriptions.push("emphasizing local culture");
    if (preferences.get("culturalInterest") === "No")
      descriptions.push("less emphasis on cultural activities");
  }

  if (descriptions.length > 0) {
    prefLanguage = `, and should include ${descriptions.join(", ")}.`;
  }

  return prefLanguage;
}

module.exports = preferencesToLanguage;
