<template>
  <DataTable
    :value="dataEntries"
    scrollable
    scrollHeight="400px"
    tableStyle="min-width: 50rem"
  >
    <Column
      v-for="col in columns"
      :key="col"
      :field="col"
      :header="col.toUpperCase()"
   />
   <Column> 
    <template #body="{ data}">
    <component v-if = "data.enrolled === false" :is="columnComponent" :rowData="data" v-bind="columnComponentProps" @click ="emitRowData(data)"/>
    <tutorButton v-if = "data.enrolled === true" text = "Details" type = "info" :clickFunction = "()=>emitStudentData(data)" ></tutorButton>
    </template>
    </Column>
  </DataTable>
</template>
<script>
export default {
  name: "tutorDataTable",
  props: {
    dataEntries: {
      type: Array,
      required: true,
    },
    columnComponent: {
      type: Object,
      required: true,
    },
    columnComponentProps: {
      type: Object,
      required: true,
    },
    lazyLoad: Boolean,
  },
  emits: ["rowData","studentData"],
  setup(props,{emit}) {
    const columns = Object.keys(props.dataEntries[0]);
    const emitRowData = (data) => {
      emit("rowData", data);
    };
    const emitStudentData = (data) => {
      emit("studentData", data);
    };
    return {
      columns,
      emitRowData,
      emitStudentData,
    };
  },
};
</script>
<style>
.p-datatable {
  border-radius: 8px; /* Rounded corners */
  overflow: hidden; /* Ensures proper boundary handling */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Light shadow */
}

.p-datatable .p-datatable-thead th {
  background-color: #3f8bcd;
  color: #333;
  font-weight: bolder;
  padding: 12px;
  text-align: left;
}

.p-datatable .p-datatable-tbody tr:hover {
  transition: background 0.2s ease-in-out;
}

.p-datatable .p-datatable-tbody td {
  padding: 10px;
  border-bottom: 1px solid #ddd; /* Separator between rows */
}

.p-datatable-scrollable-body {
  max-height: 400px; /* Set scroll height */
}
</style>