function YYYYMMDD(time) {
  return time.slice(0, 10).split("-").join(". ");
}

export { YYYYMMDD };
