<template>
  <q-page-container>
    <q-page padding>
          
    <!--main card -->
    <q-card class="my-card" flat bordered>
      <q-img style="height: 175px; width: 100%; overflow: hidden;"
        src="https://cdn.quasar.dev/img/parallax2.jpg"
      />

      <q-card-section>
        <div class="text-overline text-orange-9">Overline</div>
        <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
        <div class="text-caption text-grey">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </q-card-section>

      <q-card-actions class="row justify-between">
        <q-badge color="blue">
          Tags
        </q-badge>
        
      <q-btn color="orange" size="sm" rounded>
          read more
        </q-btn>
      </q-card-actions>
    </q-card>
    <q-separator />
    
    <!-- secondary cards -->
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">Website name</div>
          <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
          <div class="text-caption text-grey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </q-card-section>

        <q-card-section class="col-xs-5 col-sm-4  col-md-6  col-lg-5 flex flex-center">
          <q-img
            class="rounded-borders"
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
        </q-card-section>
      </q-card-section>

      <q-card-actions class="row justify-between">
        <q-badge color="blue">
          Tags
        </q-badge>
        
      <q-btn color="orange" size="sm" rounded>
          read more
        </q-btn>
      </q-card-actions>
    </q-card>
    
    <q-separator />
    
    
    <!-- sub-secondary cards -->
    <q-card class="my-card" flat bordered>

      <q-card-section>
        <div class="text-overline text-orange-9">Website Name</div>
        <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
        <div class="text-caption text-grey">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </q-card-section>

      <q-card-actions class="row justify-between">
        <q-badge class="ml-md" color="blue">
          Tags
        </q-badge>
        
      <q-btn color="orange" size="sm" rounded>
          read more
        </q-btn>
      </q-card-actions>
    </q-card>
          
        </q-page>
      </q-page-container>
</template>

<script>

export default {
  name: 'PageIndex',
  data() {
    
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
    
  }
}
</script>
