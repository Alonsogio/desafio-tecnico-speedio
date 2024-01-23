<template>
  <TopPage />
  <div class="background">
    <MenuNav />

    <div class="bodyPageCreate">
      <form @submit.prevent="saveNote">
        <textarea
          rows="4"
          cols="40"
          placeholder="Ex.: Ao ligar falar com Luiza"
        ></textarea>

        <label for="potencial">Potencial do negócio</label>
        <el-input
          v-model="formattedValue"
          placeholder="R$ 00,00"
          @blur="formatInput"
        ></el-input>

        <label for="select">Categorização</label>
        <el-select
          id="select"
          v-model="selectedOption"
          placeholder="Selecione uma opção"
          multiple
          collapse-tags
        >
          <el-option
            v-for="option in options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select>

        <label for="date">Lembrete</label>
        <el-date-picker
          id="date"
          v-model="selectedDate"
          type="date"
          placeholder="Selecione uma data"
        ></el-date-picker>

        <div class="divBtn">
          <router-link :to="{ path: '/' }" class="btnTrash">
            <TrashIcon class="trashIcon" />
          </router-link>
          <button type="submit" class="btnCreate">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script src="../create/create.js"></script>
