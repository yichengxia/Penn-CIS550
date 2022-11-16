const sortFilterOptions = (options) => {
  if (!options || Object.keys(options).length === 0) return options;
  const defaultOption = options[0];
  return [
    defaultOption,
    ...options
      .filter((option) => option !== defaultOption)
      .sort((a, b) =>
        a.label.toLowerCase().localeCompare(b.label.toLowerCase())
      ),
  ];
};

export default sortFilterOptions;
