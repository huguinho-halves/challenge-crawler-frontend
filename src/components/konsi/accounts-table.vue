<script setup lang="ts">
import { ref } from "vue";

import type { Header, Item } from "vue3-easy-data-table";
import { notify } from "@kyvg/vue3-notification";
import axios from "axios";

let url =
  "";

const items = ref([]);
const setItems = (newItems: any) => {
  items.value = newItems;
};

const searchText = ref("");
const getSearchText = () => {
  return searchText.value;
};

const headers: Header[] = [
  { text: "Código", value: "ID_ACCOUNT" },
  { text: "Nome", value: "DS_ACCOUNTNAME" },
  { text: "Beneficios", value: "DS_BENEFITS" }
];

const loadAccounts = async function () {
  let accountname = getSearchText();

  if (!accountname) {
    notify({
      title: "Erro",
      text: "É necessário informar um parâmetro para a busca",
      type: "error",
    });
    return;
  }

  let link = url.replace("{accountname}", "" + accountname);

  const response = await axios.get(link);
  let results = null;

  if (response && response.data && response.data.body) {
    results = JSON.parse(response.data.body);
    setItems(results);
  }
};
</script>

<template>
  <div class="containerWrapper">
    <div class="konsiWrapper">
      <img class="logoIntutive" src="@/assets/logo-konsi-light_a0oxr5.webp" width="350" />
    </div>

    <div class="search">
      <label>Consulta </label>

      <input v-model="searchText" placeholder="Buscar por cpf" />

      <button @click="loadAccounts()" class="btn-search">
        <span>Consultar</span>
      </button>
    </div>
    <EasyDataTable :headers="headers" :items="items" alternating />
  </div>
</template>

<style>
.containerWrapper {
  max-width: 1200px;
  margin: 0 auto;
  min-width: 1080px;
}

.konsiWrapper {
  width: 100%;
  text-align: center;
}

.logoIntutive {
  margin: 0 auto !important;
}

.search {
  width: 100%;
  margin-bottom: 20px;
}

.search label {
  display: block;
  margin-bottom: 30px;

  font-size: 18px;
  font-weight: bold;
}

.search input {
  height: 30px;
  border-radius: 5px;
  width: 300px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid gray;
}

.search .btn-search {
  height: 30px;
  border-radius: 5px;
  background: #0d6efd;
  margin-left: 10px;
  border: none;
  color: white;
}

@media (max-width: 440px) {
  .search input {
    width: 100%;
  }

  .search .btn-search {
    margin-top: 10px;
    width: 100%;
    margin-right: 10px;
    margin-left: 0px;
  }
}
</style>
