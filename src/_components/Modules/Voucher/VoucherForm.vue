<template>
  <ValidationObserver ref="observer" tag="form"  @submit.prevent="onSubmit()">
      <div class="border-b border-gray-400 flex items-center justify-between pb-5">
        <span class="text-xl font-medium">Gutschein erstellen</span>
        <button type="submit"  class="bg-peach px-5 py-3 rounded-md text-sm text-white">Speichern</button>
      </div>
      <div class="flex gap-4 md:grid justify-center md:grid-cols-2 pt-12 w-full">
        <div class="flex flex-col">
          <span class="mb-8 py-3 text-xl">Gutschein Vorschau</span>
          <VoucherCard
            :key="`vform-${formIndex}`"
            :voucher="form"
            :isFlippable="false"
          />
        </div>

        <div class="w-full flex flex-col" style="max-width: 368px">
          <div class="gap-4 grid grid-cols-3 mb-1">
            <button
              @click="currentTab = 0"
              type="button"
              class="px-3 py-3 rounded-md text-xs"
              :class="currentTab == 0 ? 'bg-black text-white' : 'border border-black text-black'"
              >
              Gestaltung
            </button>
            <button
              @click="currentTab = 1"
              type="button"
              class="px-3 py-3 rounded-md text-xs"
              :class="currentTab == 1 ? 'bg-black text-white' : 'border border-black text-black'"
              >
              Einstellungen
            </button>
            <button
              @click="currentTab = 2"
              type="button"
              class="px-3 py-3 rounded-md text-xs"
              :class="currentTab == 2 ? 'bg-black text-white' : 'border border-black text-black'"
              >
              Preis & MwSt.
            </button>
          </div>
          <div>
            <!-- Gestaltung -->
            <div
              v-show="currentTab == 0"
              class="bg-white flex flex-row flex-wrap w-full p-5 mt-10">
              <InputField
                  id="Gutscheintitel"
                  v-model="form.title"
                  type="text"
                  label="Gutscheintitel"
                  class="w-full"
                  rules="required|max:30"
                />

              <TextAreaField
                id="Kurzbeschreibung"
                v-model="form.description"
                class="w-full"
                label="Kurzbeschreibung"
                rules="required|max:200"
              />

              <TextAreaField
                id="Ausführliche Beschreibung"
                v-model="form.long_description"
                class="w-full"
                label="Ausführliche Beschreibung"
                rules="required|max:500"
                rows="5"
              />

              <div class="flex flex-col w-full">
                <div class="text-sm mb-2">Hintergrundbild</div>
                <label class="file input-field px-3 py-2 rounded-sm text-xs mb-3" style="background-color: #F7F7F7">
                    <i class="fa fa-cloud-upload-alt mr-1"></i> Bild hochladen
                    <input
                      type="file"
                      id="file"
                      accept="'image/*'"
                      aria-label="File browser example"
                      @change="(e) => croppie(e, 'croppieRef')"/>
                  <span class="file-custom"></span>
                </label>
                <section class="hidden">
                  <vue-croppie
                    ref="croppieRef"
                    :enableOrientation="true"
                    :enableResize="false"
                    :boundary="{ width: 328, height: 305 }"
                    :viewport="{ width: 328, height: 305, 'type':'square' }"
                    @update="update('croppieRef', 'background_image')"
                  />
                </section>
                <!-- the result -->
              </div>

              <span class="font-semibold text-sm mb-1">Hintergrundfarbe</span>
              <colorpicker
                v-if="AUTH_USER.role.name === 'seller'"
                v-model="form.background_description_color"
                :color="form.background_description_color"
                :label="'Kurzbeschreibung'"
              />
              <colorpicker
                v-if="AUTH_USER.role.name === 'user'"
                v-model="form.background_description_personal_color"
                :color="form.background_description_personal_color"
                :label="'Persönlichen Nachricht'"
              />
              <colorpicker
                v-model="form.header_and_footer_background_color"
                :color="form.header_and_footer_background_color"
                :label="'Kopfzeile & Fußzeile'"
              />
              <!-- <div class="w-full mb-5">
                <span class="font-semibold text-sm mx-2">
                  Hintergrundfarbe
                </span>
                <div class="w-full md:mx-2 mt-2">
                  <Material
                    v-model="material_color"
                    @input="onPickColor($event, 'background_color')"
                  />
                </div>
              </div> -->
              <!-- <div class="w-full mt-2 mb-5">
                <div class="flex flex-col">
                  <Header5
                    label="Lesehilfe"
                  />
                  <div class="tooltip ml-1">
                    <i
                      v-tippy class="fas fa-info-circle text-base text-gray-700"
                      content="Hier kannst du eine Farbe über deinen Gutschein legen und die Transparenz auswählen, dass dein Gutschein richtig gut aussieht und einfacher zu lesen ist. "
                    />
                  </div>
                </div>
                <div class="w-full md:mx-2 mt-2">
                  <Chrome
                    v-model="chrome_color"
                    @input="onPickColor($event, 'background_aid')"
                  />
                </div>
              </div> -->
              <div class="border-t my-8 block w-full"></div>

              <span class="font-semibold text-sm mb-1">Schriftfarbe</span>

              <div v-if="AUTH_USER.role.name === 'seller'" class="grid grid-cols-3 items-end relative w-full mb-1">
                <label class="text-sm col-span-2">Kurzbeschreibung</label>
                <span>
                  <toggle-button
                    :color="{checked: '#000', unchecked: '#fff', disabled: '#CCCCCC'}"
                    :switch-color="{checked: '#fff', unchecked: '#000', disabled: '#CCCCCC'}"
                    :value="(form.description_color == '#000') ? true : false"
                    @change="(e) => form.description_color = e.value ? '#000' : '#fff'"
                  />
                </span>
              </div>

              <div v-if="AUTH_USER.role.name === 'user'" class="grid grid-cols-3 items-end relative w-full mb-1">
                <label class="text-sm col-span-2">Persönlichen Nachricht</label>
                <span>
                  <toggle-button
                    :color="{checked: '#000', unchecked: '#fff', disabled: '#CCCCCC'}"
                    :switch-color="{checked: '#fff', unchecked: '#000', disabled: '#CCCCCC'}"
                    :value="(form.personal_description_color == '#000') ? true : false"
                    @change="(e) => form.personal_description_color = e.value ? '#000' : '#fff'"
                  />
                </span>
              </div>

              <div class="grid grid-cols-3 items-end relative w-full mb-1">
                <label class="text-sm col-span-2">Kopfzeile & Fußzeile</label>
                <span>
                  <toggle-button
                    :color="{checked: '#000', unchecked: '#fff', disabled: '#CCCCCC'}"
                    :switch-color="{checked: '#fff', unchecked: '#000', disabled: '#CCCCCC'}"
                    :value="(form.header_and_footer_color == '#000') ? true : false"
                    @change="(e) => form.header_and_footer_color = e.value ? '#000' : '#fff'"
                  />
                </span>
              </div>

              <div class="border-t my-8 block w-full"></div>

              <span class="text-sm mb-1">Weitere Bilder die im Gutschein und der Produktseite abgebildet sind. (Format 4 x 4)</span>

              <section class="gap-4 grid grid-cols-3 mt-3">
                <div>
                  <span class="block mb-1 text-sm">Bild 1</span>
                  <label
                    v-if="!form.image_1"
                    class="file flex flex-col input-field mb-3 px-3 py-3 rounded-sm text-2xs" style="background-color: rgb(247, 247, 247);"
                    >
                        <i class="fa fa-cloud-upload-alt mb-2 mr-1 text-base text-center"></i> Bild hochladen
                        <input
                          type="file"
                          accept="'image/*'"
                          aria-label="File browser example"
                          @change="(e) => croppie(e, 'image_1')"
                          />
                        <span class="file-custom"></span>
                    </label>
                    <section v-if="form.image_1_update" class="relative">
                      <i
                        class="-m-1 absolute cursor fa fa-close-circle fa-times-circle right-0 text-base text-center text-red-500 z-10"
                        @click="(e) => removeImage(e, 'image_1')"
                      ></i>
                      <img :src="form.image_1" width="99" height="99" />
                    </section>
                    <section class="relative hidden">
                      <i
                        class="-m-1 absolute cursor fa fa-close-circle fa-times-circle right-0 text-base text-center text-red-500 z-10"
                        @click="(e) => removeImage(e, 'image_1')"
                      ></i>
                      <vue-croppie
                        ref="image_1"
                        :enableOrientation="true"
                        :enableResize="false"
                        :boundary="{ width: 99, height: 99 }"
                        :viewport="{ width: 99, height: 99, 'type':'square' }"
                        @update="update('image_1', 'image_1')"
                      />
                    </section>
                </div>

                <div>
                  <span class="block mb-1 text-sm">Bild 2</span>
                  <label
                    v-if="!form.image_2"
                    class="file flex flex-col input-field mb-3 px-3 py-3 rounded-sm text-2xs" style="background-color: rgb(247, 247, 247);"
                    >
                        <i class="fa fa-cloud-upload-alt mb-2 mr-1 text-base text-center"></i> Bild hochladen
                        <input
                          type="file"
                          accept="'image/*'"
                          aria-label="File browser example"
                          @change="(e) => croppie(e, 'image_2')"
                          />
                        <span class="file-custom"></span>
                    </label>
                    <section v-if="form.image_2_update" class="relative">
                      <i
                        class="-m-1 absolute cursor fa fa-close-circle fa-times-circle right-0 text-base text-center text-red-500 z-10"
                        @click="(e) => removeImage(e, 'image_2')"
                      ></i>
                      <img :src="form.image_2" width="99" height="99" />
                    </section>
                    <section class="hidden relative">
                      <i
                        class="-m-1 absolute cursor fa fa-close-circle fa-times-circle right-0 text-base text-center text-red-500 z-10"
                        @click="(e) => removeImage(e, 'image_2')"
                      ></i>
                      <vue-croppie
                        ref="image_2"
                        :enableOrientation="true"
                        :enableResize="false"
                        :boundary="{ width: 99, height: 99 }"
                        :viewport="{ width: 99, height: 99, 'type':'square' }"
                        @update="update('image_2', 'image_2')"
                      />
                    </section>
                </div>

                <div>
                  <span class="block mb-1 text-sm">Bild 3</span>
                  <label
                    v-if="!form.image_3"
                    class="file flex flex-col input-field mb-3 px-3 py-3 rounded-sm text-2xs" style="background-color: rgb(247, 247, 247);"
                    >
                        <i class="fa fa-cloud-upload-alt mb-2 mr-1 text-base text-center"></i> Bild hochladen
                        <input
                          type="file"
                          accept="'image/*'"
                          aria-label="File browser example"
                          @change="(e) => croppie(e, 'image_3')"
                          />
                        <span class="file-custom"></span>
                    </label>
                    <section v-if="form.image_3_update" class="relative">
                      <i
                        class="-m-1 absolute cursor fa fa-close-circle fa-times-circle right-0 text-base text-center text-red-500 z-10"
                        @click="(e) => removeImage(e, 'image_3')"
                      ></i>
                      <img :src="form.image_3" width="99" height="99" />
                    </section>
                    <section class="hidden relative">
                      <i
                        class="-m-1 absolute cursor fa fa-close-circle fa-times-circle right-0 text-base text-center text-red-500 z-10"
                        @click="(e) => removeImage(e, 'image_3')"
                      ></i>
                      <vue-croppie
                        ref="image_3"
                        :enableOrientation="true"
                        :enableResize="false"
                        :boundary="{ width: 99, height: 99 }"
                        :viewport="{ width: 99, height: 99, 'type':'square' }"
                        @update="update('image_3', 'image_3')"
                      />
                    </section>
                </div>
              </section>
            </div>
            <!-- End of Gestaltung -->

            <!-- Einstellungen -->
            <div v-show="currentTab == 1">
              <div class="bg-white flex flex-row flex-wrap mt-10 px-8 py-5 w-full">
                <SelectField
                  v-if="!form.id"
                  id="Gültigkeitsdauer"
                  v-model="form.expiry_date"
                  class="py-1 w-full"
                  label="Gültigkeitsdauer"
                  placeholder="Bitte auswählen"
                  :options="expiry"
                  rules="required"
                />
              </div>

              <div class="bg-white flex flex-row flex-wrap w-full mt-3">
                <span class="border-b font-semibold pb-3 pt-5 px-5 text-sm w-full">Hauptkategorie</span>
                <div class="px-5 py-3 flex flex-col ">
                  <ValidationProvider rules="required" name="Hauptkategorie" v-slot="{ errors }">
                    <label class="flex items-center mb-1" v-for="(category, index) of CATEGORIES" :key="index">
                      <input name="category" type="radio" :value="category.id" v-model="form.category">
                      <span class="text-xs ml-1">{{ category.name }}</span>
                    </label>
                    <span class="text-xs text-red-500">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="bg-white flex flex-row flex-wrap w-full mt-3" v-if="form.category && SUBCATEGORIES && SUBCATEGORIES.length">
                <span class="border-b font-semibold pb-3 pt-5 px-5 text-sm w-full">Unterkategorie</span>
                <div class="px-5 py-3 flex flex-col">
                  <ValidationProvider rules="required" v-slot="{ errors }" name="Unterkategorie">
                    <label class="flex items-center mb-1" v-for="(category, index) of SUBCATEGORIES" :key="`subcategory-${index}`">
                      <input type="radio" name="sub-category" :value="category.id" v-model="form.subcategory">
                      <span class="text-xs ml-1">{{ category.name }}</span>
                    </label>
                    <span class="text-xs text-red-500">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="bg-white flex flex-row flex-wrap w-full mt-3" >
                <span class="border-b font-semibold pb-3 pt-5 px-5 text-sm w-full">Zielgruppe</span>
                <div class="px-5 py-3 flex flex-col ">
                  <ValidationProvider rules="required" v-slot="{ errors }" name="Zielgruppe">
                    <label class="flex items-center mb-1" v-for="(target, index) of target_group" :key="index">
                      <input type="radio" name="taget_group" :value="target" v-model="form.target">
                      <span class="text-xs ml-1">{{ target }}</span>
                    </label>
                    <span class="text-xs text-red-500">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="bg-white flex flex-row flex-wrap w-full mt-3">
                <span class="border-b font-semibold pb-3 pt-5 px-5 text-sm w-full">Wetter/Saison</span>
                <div class="px-5 py-3 flex flex-col ">
                  <ValidationProvider rules="required" v-slot="{ errors }" name="Wetter/Saison">
                    <label class="flex items-center mb-1" v-for="(season, index) of seasons" :key="index">
                      <input type="radio" name="season" :value="season" v-model="form.season">
                      <span class="text-xs ml-1">{{ season }}</span>
                    </label>
                    <span class="text-xs text-red-500">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>

              <div class="bg-white flex flex-row flex-wrap w-full mt-3">
                <span class="border-b font-semibold pb-3 pt-5 px-5 text-sm w-full">Nur an gewissen Tagen</span>
                <div class="py-3">
                  <div class="gap-4 grid items-end mb-1 relative w-full px-5" style="grid-template-columns: auto 1fr;">
                    <label class="text-sm">nein/ ja</label>
                    <span>
                      <toggle-button
                        :color="{checked: '#000', unchecked: '#fff', disabled: '#CCCCCC'}"
                        :switch-color="{checked: '#fff', unchecked: '#000', disabled: '#CCCCCC'}"
                        v-model="isWithLimit"
                      />
                    </span>
                  </div>
                  <div v-if="isWithLimit" class="flex flex-col w-full px-3">
                    <MultipleCheckboxField
                      name="valid_day"
                      :options="week"
                      :data="form.valid_day"
                      @onChange="form.valid_day = $event"
                    />
                  </div>
                </div>
              </div>

              <div class="bg-white flex flex-row flex-wrap w-full mt-3" v-show="isWithLimit">
                <span class="border-b font-semibold pb-3 pt-5 px-5 text-sm w-full">Nur an gewissen Tagen oder einem bestimmten Zeitraum gültig</span>
                <div class="py-3 w-full">
                  <div class="w-full mb-5 px-5">
                    <label class="text-sm mb-3 block">
                      Nur gültig im Zeitraum von … bis …
                    </label>
                    <div
                      v-for="(date, index) in form.valid_date"
                      :key="`date-${index}`"
                      class="flex flex-col"
                    >
                      <div class="flex flex-row items-baseline">
                        <div class="border flex flex-col rounded-sm w-full">
                          <DatePickerField
                            v-model="form.valid_date[index].start"
                            class="w-full border-b"
                            container=""
                            rules="required"
                            placeholder="Startdatum"
                            @input="onActionDate('change', index)"
                          />
                          <DatePickerField
                            v-model="form.valid_date[index].end"
                            class="w-full"
                            container=""
                            rules="required"
                            placeholder="Enddatum"
                            :errorMessages="[form.valid_date[index].error]"
                            @input="onActionDate('change', index)"
                          />
                        </div>
                        <a
                          href="javascript:void(0)"
                          class="flex mt-6 w-1/12 justify-center"
                          @click="onActionDate('delete', index)"
                        >
                          <i class="fas fa-times-circle text-base" />
                        </a>
                      </div>
                    </div>
                    <div class="mt-3 text-sm">
                      <a
                        v-if="form.valid_date.length < 4"
                        href="javascript:void(0)"
                        @click="onActionDate('add')"
                      >
                        <i class="fas fa-plus-circle text-base text-black" />
                        <span class="ml-3">Weiteren Zeitraum hinzufügen</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- End of Einstellungen -->
            <!-- Preis & MwSt. -->
            <div v-show="currentTab == 2" class="bg-white flex flex-row flex-wrap w-full p-5 mt-10">
              <div class="grid items-end relative w-full mb-1" style="grid-template-columns: auto 1fr;">
                <label class="text-sm col-span-2 font-semibold">Gutscheinart</label>
                <span>
                  <toggle-button
                    :color="{checked: '#000', unchecked: '#fff', disabled: '#CCCCCC'}"
                    :switch-color="{checked: '#fff', unchecked: '#000', disabled: '#CCCCCC'}"
                    :value="(form.type == 'quantity') ? true : false"
                    @change="onChangeType"
                  />
                  <span class="ml-2 text-xs">Wertgutschein / Produktgutschein</span>
                </span>
              </div>

              <span class="text-sm mt-3 font-semibold">Wert</span>

              <InputField
                v-if="form.type == 'quantity'"
                id="type"
                v-model="form.qty_val"
                type="number"
                class="py-1 w-full"
                label="Gutscheinwert"
                :rules="`required|min_value:${USER_SETTING ? USER_SETTING.minimum_voucher_value : 0.001}`"
              />

              <div class="gap-4 grid grid-cols-2 w-full">
                <InputField
                  id="Mindest"
                  v-model="form.min"
                  type="number"
                  class="py-1 w-full"
                  :placeholder="'min.'"
                  :rules="`required|${ (form.type == 'quantity') ? 'integer' : 'decimal'}|min_value:${ (form.type == 'quantity') ? 1 : USER_SETTING ? USER_SETTING.minimum_voucher_value : 0.001}`"
                />
                <InputField
                  id="Maximal"
                  v-model="form.max"
                  type="number"
                  class="py-1 w-full"
                  :placeholder="'max.'"
                  :rules="`required|${ (form.type == 'quantity') ? 'integer' : 'decimal'}|min_value:${form.min ? form.min : 0.001}`"
                />
              </div>

              <div class="flex flex-col w-full">
                <SelectField
                  id="MwSt"
                  v-model="form.tax"
                  class="w-full"
                  placeholder="Steuersatz auswählen"
                  :options="taxes"
                  :multiple="true"
                  :containerClass="(form.id) ? '' : 'mb-5'"
                  :disabled="unsure ? true : false"
                  :isHideInput="(unsure || form.id) ? true : false"
                  :rules="(unsure || form.id) ? '' : 'required'"
                >
                  <template #label_>
                    <div class="flex flex-row">
                      <span class="text-sm font-semibold">MwSt.</span>
                    </div>
                  </template>
                  <template #note_>
                    <CheckboxField
                      :checked="form.tax && ((form.tax.length <= 0 && form.id) || (form.tax.length > 0 && form.tax[0] == 'unsure'))"
                      :disabled="form.id"
                      container="my-3"
                      labelSentence="Steuersatz kann noch nicht festgestellt werden"
                      @input="onUnsure"
                    />
                  </template>
                </SelectField>
                <div v-if="form.tax && form.tax.length > 0 && form.tax[0] != 'unsure'" class="flex flex-col w-full">
                  <div class="font-semibold text-xs flex flex-row w-full">
                    Ausgewählter Steuersatz
                  </div>
                  <div
                    v-for="(row, index) in form.tax"
                    :key="`tax-${index}`"
                    class="flex flex-row w-full"
                  >
                    <InputField
                      :id="`t-label-${index}`"
                      :value="form.tax[index].label"
                      type="text"
                      class="w-1/3"
                      inputContainer="py-1"
                      placeholder="Steuer kann nicht festgestellt werden"
                      :disabled="true"
                    />
                    <InputField
                      :id="`t-value-${index}`"
                      v-model="form.tax[index].value"
                      type="number"
                      class="w-7/12"
                      inputContainer="py-1"
                      placeholder="Betrag der Steuer in €"
                      :rules="`${ (form.tax.length <= 1) ? '' : 'required' }`"
                      :disabled="(form.tax.length > 1 && !form.id) ? false : true"
                    />
                    <a
                      v-if="!form.id"
                      href="javascript:void(0)"
                      class="flex mt-4 w-1/12 justify-center"
                      @click="onActionTax('delete', index)"
                    >
                      <i class="fas fa-trash text-red-900 text-base" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End of Preis & MwSt. -->
          <!-- <div class="flex justify-end">
            <button class="bg-peach px-5 py-3 rounded-md text-sm text-white mt-10">
              {{ data && data.id ? 'Aktualisieren' : 'Speichern' }}
            </button>
          </div> -->
        </div>
      </div>
  </ValidationObserver>
</template>
<script>
  import VoucherCard from '_components/List/Modules/VoucherList/VoucherDisplay/'
  import Header5 from '_components/Headers/Header5';
  import InputField from '_components/Form/InputField'
  import CheckboxField from '_components/Form/CheckboxField'
  import DatePickerField from '_components/Form/DatePickerField'
  import Button from '_components/Button'
  import TextAreaField from '_components/Form/TextAreaField'
  import SelectField from '_components/Form/SelectField'
  import Colorpicker from '_components/Colorpicker'
  import MultipleCheckboxField from '_components/Form/MultipleCheckboxField'
  import { Chrome } from 'vue-color'
  import { ToggleButton } from 'vue-js-toggle-button'
  import 'vue2-datepicker/index.css'
  import { getWeek } from '_helpers/DefaultValues'
  import { toFormData } from '_helpers/CustomFunction'
  import moment from 'moment'
  import Vue from 'vue';
  import VueCroppie from 'vue-croppie';
  import 'croppie/croppie.css' // import the croppie css manually

  Vue.use(VueCroppie);

  export default {
    components: {
      Header5,
      Button,
      InputField,
      CheckboxField,
      DatePickerField,
      VoucherCard,
      Chrome,
      ToggleButton,
      TextAreaField,
      TextAreaField,
      SelectField,
      MultipleCheckboxField,
      Colorpicker
    },
    props: {
      data: {
        type: Object,
        default() {
          return null
        },
      },
    },
    data() {
      return {
        currentTab: 0,
        isWithLimit: false,
        unsure: false,
        formIndex: 0,
        hasFile: false,
        material_color: {
          hex: '#FFF',
          rgba: { r: 255, g: 255, b: 255, a: 255 },
        },
        chrome_color: {
          hex: '#FFF',
          rgba: { r: 255, g: 255, b: 255, a: 255 },
        },
        categories: [],
        form: {
          id: null,
          category: '',
          subcategory: '',
          target: '',
          season: '',
          voucher_category_id: null,
          seller_id: null,
          title: '',
          description: '',
          long_description: '',
          background_aid: 'transparent',
          background_color: '#fff',
          background_description_color: '#1D4F55',
          background_description_personal_color: '#1D4F55',
          header_and_footer_background_color: '#fff',
          description_color: '#fff',
          personal_description_color: '#fff',
          header_and_footer_color: '#000',
          text_color: 'dark',
          background_image: '',
          image_1: '',
          image_2: '',
          image_3: '',
          tax: [],
          valid_day: [],
          valid_date: [],
          type: 'value',
          min: null,
          max: null,
          expiry_date: null,
          qty_val: 0,
          qty_min: 0,
          qty_max: 0,
          val_min: 0,
          val_max: 0,
          remove_bg: false,
          seller: null
        },
        week: getWeek,
        background_image: null,
        chunk_voucher_img: [],
        taxes: [],
        expiry: [],
        target_group: ['Paare', 'Freunde', 'Kinder', 'Frauen', 'Männer'],
        seasons: ['Sommer', 'Winter', 'Schönwetter', 'Schlechtwetter']
      }
    },
    computed: {
      AUTH_USER()
      {
        return this.$store.getters.AUTH_USER
      },
      CATEGORIES()
      {
        return this.$store.getters.CATEGORIES
      },
      SUBCATEGORIES() {
        let selectCategory = this.CATEGORIES.find(category => category.id == this.form.category)
        return selectCategory.subcategories
      },
      USER_SETTING()
      {
        return this.$store.getters.USER_SETTING
      },
    },
    watch: {
      data(newVal)
      {
        this.onSetForm()
      },
    },
    beforeMount() {
      this.onSetForm()
      this.categories = this.CATEGORIES.map( row => {
        return {
          id: row.id,
          label: row.name,
        }
      })
      this.onSetTax()
      this.onSetExpiry()
    },
    methods: {
      async onSubmit()
      {

        try {
          const isValid = await this.$refs.observer.validate();

          if (!isValid) {
            let errors = [];
            for (const [key, value] of Object.entries(this.$refs.observer.errors)){
              if (value.length) {
                errors.push(key);
              }
            }

            this.$swal({
              icon: 'warning',
              title: 'Dieses Feld muss ausgefüllt werden!',
              text: errors.toString(),
              confirmButtonColor: '#48BB78',
              confirmButtonText: 'Bestätigen'
            })
            return
          }
          await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
          this.form.seller_id = this.AUTH_USER.data.id
          this.form.voucher_category_id = this.form.category.id
          if( this.form.type == 'value' ) {
            this.form.val_min = this.form.min
            this.form.val_max = this.form.max
          } else {
            this.form.qty_min = this.form.min
            this.form.qty_max = this.form.max
          }

          // this.form.background_image = this.background_image

          const url = this.form.id ? 'UPDATE_VOUCHER' : 'ADD_VOUCHER'

          // await this.$store.dispatch(url, this.form)
          // this.$swal({
          //   icon: 'success',
          //   title: 'Erfolgreich!',
          //   text: `${this.form.id ? 'Updating' : 'Adding'} new voucher.`,
          //   allowOutsideClick: false,
          //   confirmButtonColor: '#48BB78',
          //   confirmButtonText: 'Bestätigen'
          // });
          // this.onResetForm()
          // await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })

          const { voucher } = await this.$store.dispatch(url, this.form)
          // await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          // if(this.background_image) {

          //   // await this.$store.commit('SET_IS_PROCESSING', { status: 'open' })
          //   this.chunk_voucher_img = this.onGetChunk(this.background_image)
          //   const random_string = this.$helpers.randomString(10)
          //   while (this.chunk_voucher_img.length > 0) {
          //     await this.onUploadVoucherImg(voucher.id, random_string)
          //   }
          //   // await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          // }
          // this.$swal({
          //   icon: 'success',
          //   title: 'Successful!',
          //   text: `${this.form.id ? 'Updating' : 'Adding'} new voucher.`,
          //   allowOutsideClick: false,
          //   confirmButtonColor: '#48BB78',
          // });
          // this.onResetForm()

          this.$router.push('/vouchers')
        } catch (err) {

          console.log('err',err)

          await this.$store.commit('SET_IS_PROCESSING', { status: 'close' })
          if( err?.response?.data?.message ) {
            this.$swal({
              icon: 'warning',
              title: 'Warnung!',
              text: err.response.data.message,
              confirmButtonColor: '#48BB78',
              confirmButtonText: 'Bestätigen'
            })
          }
        }
      },
      async onUploadVoucherImg(id, random)
      {
        let tempForm = {
          id,
          attachment: this.chunk_voucher_img[0],
          is_last: this.chunk_voucher_img.length == 1 ? 1 : 0,
          file_name: `${random}-${this.background_image.name}`
        }
        await this.$store.dispatch('UPLOAD_BG_IMG_VOUCHER', tempForm)
        this.chunk_voucher_img.shift()
      },
      onGetChunk(file)
      {
        let size = 999950
        let chunks = Math.ceil(file.size / size)
        let temp_chunk = []

        for (let i = 0; i < chunks; i++) {
          temp_chunk.push(file.slice(
            i * size, Math.min(i * size + size, file.size), file.type
          ))
        }
        return temp_chunk
      },
      onUnsure(value)
      {
        this.unsure = value
        if( value ) {
          this.form.tax = ['unsure']
        } else {
          this.form.tax = []
        }
      },
      onChangeTextColor(e)
      {
        this.form.text_color = e.value ? 'dark' : 'light'
      },
      onChangeType(e)
      {
        this.form.type = e.value ? 'quantity' : 'value'
      },
      // onChangeTax(data)
      // {
      //   const value = {
      //     id: this.form.tax.length + 1,
      //     ...data[0]
      //   }
      //   this.form.tax = [
      //     ...this.form.tax,
      //     value
      //   ]
      // },
      onPickColor( { rgba, hex }, type )
      {
        if (type == 'background_aid') {
          this.form.background_aid = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
        } else {
          this.form.background_color = hex
        }
      },
      onSetTax()
      {
        this.taxes = [
          {
            tax: '0',
            label: '0%',
            value: null,
          }, {
            tax: '5',
            label: '5%',
            value: null,
          }, {
            tax: '10',
            label: '10%',
            value: null,
          }, {
            tax: '13',
            label: '13%',
            value: null,
          }, {
            tax: '20',
            label: '20%',
            value: null,
          },
        ]
      },
      onSetExpiry()
      {
        let expiry = []
        for (let i = 4; i <= 10; i++) {
          expiry = [
            ...expiry,
            i
          ]
          this.expiry = expiry
        }
      },
      onActionTax( action, index = null )
      {
        if( action === 'add' ) {
          this.form.tax.push({
            tax: '0',
            label: '0%',
            value: null,
          })
        } else {
          this.form.tax = this.form.tax.filter( (row, i) => i != index)
          if( this.form.tax.length == 1 ) {
            this.form.tax[0].value = null
          }
        }
      },
      onActionDate( action, index = null )
      {
        if( action === 'add' ) {
          this.form.valid_date.push({
            start: '',
            end: '',
          })
        } else if( action === 'change' ) {
          const {  start, end } = this.form.valid_date[index]

          this.form.valid_date = this.form.valid_date.map((row, i) => {
            row.error = ''
            if(moment(end).isBefore(start, 'day') && index == i) {
              row.error = 'Bitte gib ein gültiges Datum ein'
            }
            return row
          })
        } else {
          this.form.valid_date = this.form.valid_date.filter( (date, i) => i != index)
        }
      },
      onSetForm()
      {
        if( this.AUTH_USER.isAuth ) {
          this.form.seller = this.AUTH_USER.data
        }
        if(this.data?.id) {
          if(this.data.valid_day || this.data.valid_date) {
            this.isWithLimit = true
          }

          if (this.data.data_json != null) {
            this.form.id = this.$route.name == 'vouchers-update'
              ? this.$route.params.id
              : null;
            this.form = this.data.data_json
            this.form.image_1_update = true
            this.form.image_2_update = true
            this.form.image_3_update = true
            this.form.valid_date = this.data.valid_date || []
            this.form.valid_day = this.data.valid_day || []
            this.form.category = this.data.voucher_category.id
            this.form.seller = this.data.seller
          } else {
            this.form = {
              id: this.data.id,
              title: this.data.title,
              description: this.data.description,
              min: (this.data.type == 'quantity') ? this.data.qty_min : this.data.val_min,
              max: (this.data.type == 'quantity') ? this.data.qty_max : this.data.val_max,
              qty_val: this.data.qty_val,
              valid_date: this.data.valid_date || [],
              valid_day: this.data.valid_day || [],
              tax: this.data.tax || [],
              type: this.data.type,
              category: this.data.voucher_category.id,
              text_color: this.data.text_color,
              background_color: this.data.background_color,
              background_aid: this.data.background_aid,
              background_image: this.data.background_image,
              seller: this.AUTH_USER.data,
              background_description_color: '#1D4F55',
              background_description_personal_color: '#1D4F55',
              header_and_footer_background_color: '#fff',
              description_color: '#fff',
              personal_description_color: '#fff',
              header_and_footer_color: '#000',
            }
          }
          this.formIndex = this.formIndex + 1
        }
      },
      onResetForm()
      {
        this.form = {
          id: null,
          voucher_category_id: null,
          seller_id: null,
          title: '',
          description: '',
          background_color: '#fff',
          background_aid: 'transparent',
          text_color: 'dark',
          background_image: '',
          valid_day: [],
          valid_date: [
            {
              start: '2020-05-09',
              end: '2020-05-09',
            }
          ],
          type: 'value',
          min: 0,
          max: 0,
          qty_val: 0,
          qty_min: 0,
          qty_max: 0,
          val_min: 0,
          val_max: 0,
        }
      },
      croppie (e, ref) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;

        var reader = new FileReader();
        reader.onload = e => {
          this.$refs[ref].$vnode.elm.parentElement.classList.remove('hidden')
          this.$refs[ref].bind({
            url: e.target.result
          });
        };

        reader.readAsDataURL(files[0]);
      },
      // CALBACK USAGE
      crop(ref, form) {
          // Here we are getting the result via callback function
          // and set the result to this.cropped which is being
          // used to display the result above.
          let size = form == 'background_image'
            ? { width: 367, height: 341}
            : { width: 200, height: 200};
          let options = {
              type: 'base64',
              format: 'jpeg',
              size,
              quality: 1,
          }
          this.$refs[ref].result(options, (output) => {
            this.form[form] = output
          });
      },
      update(ref, form) {
        this.crop(ref, form)
      },
      removeImage(e, form) {
        e.target.parentElement.classList.add('hidden')
        this.form[form] = ''
        this.form[form + '_update'] = false
      }
    }
  }
</script>
<style lang="css" scoped>
  .vc-material {
    height: unset !important;
    width: 100%;
    border-radius: 8px !important;
  }
  input[type="file"] {
    display: none;
  }
</style>
<style lang="css">
  .grid-block-wrapper {
    background: #fff;
  }
  .vue-file-agent .file-preview-new svg {
    margin: 20px 40px !important;
    height: 50% !important;
  }
  .vue-file-agent .file-preview-new:before {
    background: #fff !important;
  }
  div.vue-file-agent.file-input-wrapper {
    border: 0 !important;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);
  }
  .v-switch-core {
    border: 1px solid black;
  }
</style>