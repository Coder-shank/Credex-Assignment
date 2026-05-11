import pricingData from "../data/pricingData";

export function generateAudit(tools) {
  const results = [];

  tools.forEach((item) => {
    const currentSpend = Number(item.spend);

    let recommendation = "Current plan looks fine";
    let savings = 0;
    let reason = "Your current usage appears reasonable.";

    if (
      item.plan === "Team" &&
      Number(item.seats) <= 2
    ) {
      recommendation = "Downgrade to Plus/Pro plan";

      savings =
        currentSpend -
        pricingData[item.tool]?.Plus * Number(item.seats);

      reason =
        "Team plans for very small teams are often unnecessarily expensive.";
    }

    if (
      item.plan === "Business" &&
      Number(item.seats) <= 3
    ) {
      recommendation = "Consider Pro plan";

      savings =
        currentSpend -
        pricingData[item.tool]?.Pro * Number(item.seats);

      reason =
        "Business plans may not be cost-effective for smaller teams.";
    }

    results.push({
      tool: item.tool,
      currentPlan: item.plan,
      recommendation,
      savings,
      reason,
    });
  });

  return results;
}