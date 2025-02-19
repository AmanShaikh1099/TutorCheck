<template>
  <div class="card flex justify-center">
    <AutoComplete
      v-model="selectedItem"
      dropdown
      :suggestions="dropdownOptions"
      @complete="searchFunction"
      @change="emitSelectedValue"
    />
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "tutorDropDown",
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  emit: ["selectedItem"],
  setup(props, { emit }) {
    const selectedItem = ref("");
    const dropdownOptions = ref([]);
    dropdownOptions.value = props.options;
    const searchFunction = (event) => {
      dropdownOptions.value = props.options.filter((option) =>
        option.toLowerCase().includes(event.query.toLowerCase())
      );
    };
    const emitSelectedValue = () => {
      emit("selectedItem", selectedItem.value);
    };
    return {
      searchFunction,
      emitSelectedValue,
      selectedItem,
      dropdownOptions,
    };
  },
};
</script>

<style>
/* Card container styling */
.card {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  max-width: 400px; /* Adjust card width */
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
}

/* AutoComplete Component */
.p-autocomplete {
  width: 100%; /* Make the input field take full width inside the card */
  max-width: 350px; /* Optional: Adjust max width */
}

/* Input Field */
.p-autocomplete-input {
  border: 2px solid #007bff; /* Blue border */
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  width: 100%;
  transition: border-color 0.3s, box-shadow 0.3s;
}

/* Focus Effect */
.p-autocomplete-input:focus {
  border-color: #0056b3;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

/* Dropdown Panel */
.p-autocomplete-panel {
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* List Items */
.p-autocomplete-items {
  padding: 8px;
}

.p-autocomplete-item {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

/* Hover Effect for List Items */
.p-autocomplete-item:hover {
  background: #007bff;
  color: white;
}

/* Dropdown Panel */
.p-autocomplete-panel {
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-height: 200px; /* Set a max height for the dropdown */
  overflow-y: auto; /* Allow scrolling if the content exceeds the max-height */
  opacity: 0; /* Start with dropdown hidden */
  visibility: hidden; /* Initially hidden */
  transition: opacity 0.3s ease, visibility 0s 0.3s; /* Smooth fade-in and fade-out */
}

/* When the dropdown is shown */
.p-autocomplete-panel.p-autocomplete-panel-visible {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease;
}

/* AutoComplete Option */
.p-autocomplete-option {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  white-space: normal;
  display: flex;
  align-items: center;
}

/* Hover Effect for AutoComplete Options */
.p-autocomplete-option:hover {
  background-color: #007bff; /* Blue background */
  color: white; /* White text on hover */
  border-radius: 4px;
}

/* Active state (when option is selected) */
.p-autocomplete-option-active {
  background-color: #0056b3; /* Darker blue for active option */
  color: white;
  border-radius: 4px;
}

/* Option Disabled state */
.p-autocomplete-option[aria-disabled="true"] {
  background-color: #f0f0f0;
  color: #999999;
  cursor: not-allowed;
}
</style>