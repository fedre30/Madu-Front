<template>
  <div class="home">
    <Map
      v-loading="loading"
      :coordinates="coordinates"
      :key="keygen"
      :mapData="mapData"
    />
  </div>
</template>

<script>
import Map from "../components/atoms/Map";
export default {
  name: "home",
  components: {
    Map
  },
  data: function() {
    return {
      loading: false,
      coordinates: {
        latitude: 48.864716,
        longitude: 2.349014
      },
      mapData: [
        {
          name: "GIVEN",
          coords: {
            latitude: 48.8588241,
            longitude: 2.3991186
          },
          // address: "89 rue de Bagnolet",
          zip_code: "75020",
          hours: "midi du mardi au vendredi, samedi 19-23h30",
          keywords: "Happy hour sangria-tartine vegan",
          category: "Resto",
          type: "Healthy",
          price: "14,5€ menu",
          herbivorous_grade: "VEGAN FRIENDLY (VG)",
          gluten_free: "OPTION",
          bio: "EN PARTIE"
        },
        {
          name: "LE MEZZE DU CHEF",
          coords: {
            latitude: 48.8687917,
            longitude: 2.3884662
          },
          // address: "80 rue de Ménilmontant",
          zip_code: "75020",
          hours: "9h-minuit",
          keywords: "Turque, chaleureux, mezze",
          category: "Resto",
          type: "Oriental",
          price: "10€ assiette",
          herbivorous_grade: "mezze",
          gluten_free: "VEGAN FRIENDLY (VG)",
          bio: "OPTION"
        },
        {
          name: "LOVE ME CRU",
          coords: {
            latitude: 48.8725932,
            longitude: 2.3779299
          },
          // address: "44 rue de Tourtille",
          zip_code: "75020",
          hours: "lundi au samedi midi",
          keywords: "Petite épicerie avec jus, salades, wrap",
          category: "Resto",
          type: "Healthy",
          price: "9,50€ menu 4€ jus",
          herbivorous_grade: "VEGAN",
          gluten_free: "OPTION",
          bio: "EN PARTIE"
        },
        {
          name: "PRIMEUR",
          coords: {
            latitude: 48.8715277,
            longitude: 2.3760888
          },
          // address: "4 rue Lemon",
          zip_code: "75020",
          hours: "midi tous les jours soir du jeudi au samedi",
          keywords: "Cantine, local, burger vegan",
          category: "Resto",
          type: undefined,
          price: "15€ plat",
          herbivorous_grade: "VEGAN FRIENDLY (VG)",
          gluten_free: undefined,
          bio: "FULL"
        },
        {
          name: "CANTINE VAGABONDE",
          coords: {
            latitude: 48.8851319,
            longitude: 2.3630578
          },
          // address: "11 rue d'Aubervilliers",
          zip_code: "75019",
          hours: "midi semaine, vendredi soir",
          keywords: "Commande au comptoir, bonne franquette, cuisine familiale",
          category: "Resto",
          type: "Healthy",
          price: "11€ plat",
          herbivorous_grade: "VEGAN FRIENDLY (VG)",
          gluten_free: "OPTION",
          bio: "EN PARTIE"
        },
        {
          name: "LE FAITOUT",
          coords: {
            latitude: 48.8747937,
            longitude: 2.3803497
          },
          // address: "23 avenue Simon Bolivar",
          zip_code: "75019",
          hours: "16-1h30 du mardi au dimanche",
          keywords: "Cuisine traditionnelle, jeudi jazz",
          category: "Resto",
          type: undefined,
          price: "13€ plat",
          herbivorous_grade: "VEGAN",
          gluten_free: undefined,
          bio: "EN PARTIE"
        },
        {
          name: "ABATTOIR VEGETAL",
          coords: {
            latitude: 48.8905137,
            longitude: 2.3431012
          },
          // address: "61 rue Ramey",
          zip_code: "75018",
          hours: "horaires divers",
          keywords: "Coffee shop, bar à jus, local, proche Sacré-cœur",
          category: "Resto",
          type: undefined,
          price: "16,50-19€ menu",
          herbivorous_grade: "VEGAN",
          gluten_free: undefined,
          bio: "FULL"
        },
        {
          name: "LE MYRHA",
          coords: {
            latitude: 48.886839,
            longitude: 2.3489214
          },
          // address: "70 rue Myrha",
          zip_code: "75018",
          hours: undefined,
          keywords: "Carte éclectique, brunch vegan 17€",
          category: "Resto",
          type: undefined,
          price: "7€ plat",
          herbivorous_grade: "VEGAN FRIENDLY (VG)",
          gluten_free: "OPTION",
          bio: "FULL"
        },
        {
          name: "JO & NANA CAKES",
          coords: {
            latitude: 48.880818,
            longitude: 2.2971234
          },
          // address: "6 rue Rennequin",
          zip_code: "75017",
          hours: "mardi au samedi 12-19h",
          keywords:
            "Patisserie, salon de thé, coffee shop, formée par Thierry Marx ?",
          category: "Resto",
          type: "Pâtisserie",
          price: "5€ patisserie",
          herbivorous_grade: "VEGAN",
          gluten_free: "FULL",
          bio: "EN PARTIE"
        },
        {
          name: "JOY IN FOOD",
          coords: {
            latitude: 48.8843238,
            longitude: 2.3214139
          },
          // address: "2 rue Truffaut",
          zip_code: "75017",
          hours: "lundi au vendredi 12-14h30",
          keywords: "Cantine, cuisine familiale",
          category: "Resto",
          type: undefined,
          price: "14,5€ menu",
          herbivorous_grade: "VEGGIE",
          gluten_free: undefined,
          bio: "EN PARTIE"
        },
        {
          name: "MY KITCH'N",
          coords: {
            latitude: 48.8886441,
            longitude: 2.3182277
          },
          // address: "82 rue Lemercier",
          zip_code: "75017",
          hours: "fermé le lundi,12-15h",
          keywords: "Carte eclectique, burger, salade, pates, raw",
          category: "Resto",
          type: undefined,
          price: "15-20€ menu",
          herbivorous_grade: "VEGAN",
          gluten_free: "OPTION",
          bio: "EN PARTIE"
        },
        {
          name: "SUPER VEGAN",
          coords: {
            latitude: 48.893261,
            longitude: 2.3211233
          },
          // address: "118 rue des Moines",
          zip_code: "75017",
          hours: "horaires divers",
          keywords: "Kebab",
          category: "Resto",
          type: "Oriental",
          price: "8-13€ menu",
          herbivorous_grade: "VEGAN",
          gluten_free: undefined,
          bio: undefined
        },
        {
          name: "HAPPIZ",
          coords: {
            latitude: 48.8650088,
            longitude: 2.2808878
          },
          // address: "23 rue des Sablons",
          zip_code: "75016",
          hours: "fermé lundi",
          keywords: "Pizza sur mesure, sur place ou à emporter",
          category: "Resto",
          type: "Pizza",
          price: "12€ pizza",
          herbivorous_grade: "VEGAN FRIENDLY (VG)",
          gluten_free: undefined,
          bio: undefined
        },
        {
          name: "VEGE",
          coords: {
            latitude: 48.8458584,
            longitude: 2.2931439
          },
          // address: "122 rue du théâtre",
          zip_code: "75015",
          hours: "lundi au samedi 11h30-23h",
          keywords: "Turque, vintage, kofte à tester, full",
          category: "Resto",
          type: "Oriental",
          price: undefined,
          herbivorous_grade: "VEGAN FRIENDLY (VG)",
          gluten_free: "X",
          bio: "EN PARTIE"
        },
        {
          name: "OPTIQUE DURABLE",
          coords: {
            latitude: 48.8552578,
            longitude: 2.3673273
          },
          // address: "2 rue Amelot",
          zip_code: "75011",
          hours: "mardi au samedide 10h30 à 13h00 et de 14h30 à 19h00 ",
          keywords: undefined,
          category: "Boutique",
          type: "Opticien",
          price: undefined,
          herbivorous_grade: undefined,
          gluten_free: undefined,
          bio: undefined
        },
        {
          name: "VEGAN FOOD TOUR",
          coords: {
            latitude: 48.8675962,
            longitude: 2.3630041
          },
          // address: "Place de la République",
          zip_code: "75003",
          hours: "3H30",
          keywords: undefined,
          category: "Activité",
          type: "Walking tour",
          price: "65 €",
          herbivorous_grade: "VEGAN",
          gluten_free: undefined,
          bio: undefined
        },
        {
          name: "DIY lampe upcycling",
          coords: {
            latitude: 48.8608934,
            longitude: 2.4289472
          },
          // address: "Passage des Bons plants",
          zip_code: "93100",
          hours: "2H",
          keywords: undefined,
          category: "Activité",
          type: "Masterclass",
          price: "55 €",
          herbivorous_grade: undefined,
          gluten_free: undefined,
          bio: undefined
        },
        {
          name: "LUSH",
          coords: {
            latitude: 48.8394511,
            longitude: 2.3180269
          },
          // address: "17 Boulevard de Vaugirard",
          zip_code: "75015",
          hours: "lundi au vendredi 7H-20H, samedi 9H-20H, dimanche 10H-20H",
          keywords: undefined,
          category: "Boutique",
          type: "Beauty",
          price: undefined,
          herbivorous_grade: "VEGAN FRIENDLY (VG)",
          gluten_free: undefined,
          bio: "OPTION"
        },
        {
          name: "SUPER NATURELLE",
          coords: {
            latitude: 48.8894497,
            longitude: 2.3441784
          },
          // address: "34 Rue Ramey",
          zip_code: "75018",
          hours: "5H",
          keywords: undefined,
          category: "Activité",
          type: "Masterclass",
          price: "165 €",
          herbivorous_grade: "VEGGIE",
          gluten_free: undefined,
          bio: "FULL"
        },
        {
          name: "NATA",
          coords: {
            latitude: 48.853849,
            longitude: 2.3961578
          },
          // address: "28 Rue Planchat",
          zip_code: "75020",
          hours: undefined,
          keywords: undefined,
          category: "Activité",
          type: "Yoga",
          price: undefined,
          herbivorous_grade: "VEGAN",
          gluten_free: undefined,
          bio: undefined
        },
        {
          name: "NATA",
          coords: {
            latitude: 48.853849,
            longitude: 2.3961578
          },
          // address: "28 Rue Planchat",
          zip_code: "75020",
          hours: undefined,
          keywords: undefined,
          category: "Activité",
          type: "Masterclass",
          price: undefined,
          herbivorous_grade: "VEGAN",
          gluten_free: undefined,
          bio: undefined
        },
        {
          name: "PAINT IN GREEN",
          coords: {
            latitude: 48.879309,
            longitude: 2.3899289
          },
          // address: "78 rue Compans",
          zip_code: "75019",
          hours: "4H",
          keywords: undefined,
          category: "Activité",
          type: "Masterclass",
          price: "80 €",
          herbivorous_grade: "VEGAN",
          gluten_free: undefined,
          bio: "FULL"
        },
        {
          name: "LES PETITES PATISSERIES - RAW & VEGAN",
          coords: {
            latitude: 48.8590064,
            longitude: 2.3725506
          },
          // address: "44 rue du chemin vert",
          zip_code: "75011",
          hours: "3H",
          keywords: undefined,
          category: "Activité",
          type: "Masterclass",
          price: "50 €",
          herbivorous_grade: undefined,
          gluten_free: undefined,
          bio: undefined
        },
        {
          name: "LA VIE CLAIRE",
          coords: {
            latitude: 48.8406747,
            longitude: 2.2938431
          },
          // address: "194 rue Lecourbe",
          zip_code: "75015",
          hours: "lundi au samedi 9h30-20h dimanche 9h30-12h30",
          keywords: undefined,
          category: "Boutique",
          type: "Grocery",
          price: undefined,
          herbivorous_grade: undefined,
          gluten_free: undefined,
          bio: undefined
        }
      ]
    };
  },
  computed: {
    keygen() {
      return `${this.coordinates.latitude}${this.coordinates.longitude}`;
    }
  },
  mounted() {
    this.loading = true;
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.$set(this.coordinates, "latitude", pos.coords.latitude);
        this.$set(this.coordinates, "longitude", pos.coords.longitude);
        this.loading = false;
      },
      error => {
        console.error(error); //eslint-disable-line
        this.loading = false;
      }
    );
  }
};
</script>

<style lang="scss">
.home {
  padding: 2rem;
}
</style>
