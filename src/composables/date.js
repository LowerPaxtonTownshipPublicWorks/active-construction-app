function formatDate(attributeDate) {
    const date = new Date(attributeDate + "T00:00:00");
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

function formatDetourDescription(type, startDate, endDate) {

    let outputText;

    if (type.includes("upcoming")) {
        outputText = `Starting on ${formatDate(startDate)}`
    }

    if (type.includes("active")) {
        outputText = `Ending on ${formatDate(endDate)}`
    }
    return outputText
  }

function formatDateDayOnly(attributeDate) {
    const date = new Date(attributeDate + "T24:00:00Z")
    return date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatDateUnix(attributeDate) {
    const date = new Date(attributeDate)
    return date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatProjectTimeline(startDate, endDate) {
    if (!startDate) return "TBD";
    if (endDate) return `${formatDateDayOnly(startDate)} - ${formatDateDayOnly(endDate)}`;
    return `${formatDateDayOnly(startDate)} - TBD`;
}  

  export {
    formatDate,
    formatDetourDescription,
    formatDateDayOnly,
    formatDateUnix,
    formatProjectTimeline
  }