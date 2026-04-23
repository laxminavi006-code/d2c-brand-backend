const validTransitions = {
  SUBMITTED: ["UNDER_REVIEW"],
  UNDER_REVIEW: ["SHORTLISTED"],
  SHORTLISTED: ["ACCEPTED", "REJECTED"],
  ACCEPTED: [],
  REJECTED: [],
};

const validateStatusTransition = (current, next) => {
  if (!validTransitions[current].includes(next)) {
    throw new Error("Invalid status transition");
  }
};

module.exports = { validateStatusTransition };