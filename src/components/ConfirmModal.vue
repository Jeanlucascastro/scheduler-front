<template>
  <!-- Cancel Modal -->
  <div
    class="modal fade"
    :id="modalId"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{ tittle }}</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">...</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ cancel }}</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="cancel">
            {{ confirm }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script lang="ts">



export default {
  name: 'ConfirmModal',
  data() {
    return {
      
    }
  },
  setup() {},

  components: {},

  props: {
    confirm: String,
    cancel: String,
    tittle: String,
    message: String,
    modalId: String
  },

  methods: {
    open() {
      const modalId = this.modalId as string;
      //const modal = new bootstrap.Modal(document.getElementById(modalId));
      //modal.show();
    }
  }
}
</script>
