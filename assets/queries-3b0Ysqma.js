import{p as C,_ as w,a as D,g as R,i as f,h as S,w as $,k as W,l as j,n as q,o as M}from"./index-BYK2tOFt.js";var v=new Map,F=new Map,y=!0,g=!1;function O(e){return e.replace(/[\s,]+/g," ").trim()}function _(e){return O(e.source.body.substring(e.start,e.end))}function A(e){var a=new Set,n=[];return e.definitions.forEach(function(r){if(r.kind==="FragmentDefinition"){var t=r.name.value,s=_(r.loc),i=F.get(t);i&&!i.has(s)?y&&console.warn("Warning: fragment with name "+t+` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`):i||F.set(t,i=new Set),i.add(s),a.has(s)||(a.add(s),n.push(r))}else n.push(r)}),w(w({},e),{definitions:n})}function L(e){var a=new Set(e.definitions);a.forEach(function(r){r.loc&&delete r.loc,Object.keys(r).forEach(function(t){var s=r[t];s&&typeof s=="object"&&a.add(s)})});var n=e.loc;return n&&(delete n.startToken,delete n.endToken),e}function N(e){var a=O(e);if(!v.has(a)){var n=C(e,{experimentalFragmentVariables:g,allowLegacyFragmentVariables:g,experimentalFragmentArguments:g});if(!n||n.kind!=="Document")throw new Error("Not a valid GraphQL document.");v.set(a,L(A(n)))}return v.get(a)}function l(e){for(var a=[],n=1;n<arguments.length;n++)a[n-1]=arguments[n];typeof e=="string"&&(e=[e]);var r=e[0];return a.forEach(function(t,s){t&&t.kind==="Document"?r+=t.loc.source.body:r+=t,r+=e[s+1]}),N(r)}function Q(){v.clear(),F.clear()}function T(){y=!1}function z(){g=!0}function H(){g=!1}var d={gql:l,resetCaches:Q,disableFragmentWarnings:T,enableExperimentalFragmentVariables:z,disableExperimentalFragmentVariables:H};(function(e){e.gql=d.gql,e.resetCaches=d.resetCaches,e.disableFragmentWarnings=d.disableFragmentWarnings,e.enableExperimentalFragmentVariables=d.enableExperimentalFragmentVariables,e.disableExperimentalFragmentVariables=d.disableExperimentalFragmentVariables})(l||(l={}));l.default=l;function B(e){var a=D.useContext(R()),n=e||a.client;return f(!!n,78),n}var o;(function(e){e[e.Query=0]="Query",e[e.Mutation=1]="Mutation",e[e.Subscription=2]="Subscription"})(o||(o={}));var h;function I(e){var a;switch(e){case o.Query:a="Query";break;case o.Mutation:a="Mutation";break;case o.Subscription:a="Subscription";break}return a}function x(e){$("parser",function(){globalThis.__DEV__!==!1&&f.warn(93)}),h||(h=new W(j.parser||1e3));var a=h.get(e);if(a)return a;var n,r,t;f(!!e&&!!e.kind,94,e);for(var s=[],i=[],c=[],p=[],m=0,k=e.definitions;m<k.length;m++){var u=k[m];if(u.kind==="FragmentDefinition"){s.push(u);continue}if(u.kind==="OperationDefinition")switch(u.operation){case"query":i.push(u);break;case"mutation":c.push(u);break;case"subscription":p.push(u);break}}f(!s.length||i.length||c.length||p.length,95),f(i.length+c.length+p.length<=1,96,e,i.length,p.length,c.length),r=i.length?o.Query:o.Mutation,!i.length&&!c.length&&(r=o.Subscription);var E=i.length?i:c.length?c:p;f(E.length===1,97,e,E.length);var b=E[0];n=b.variableDefinitions||[],b.name&&b.name.kind==="Name"?t=b.name.value:t="data";var V={name:t,type:r,variables:n};return h.set(e,V),V}x.resetCache=function(){h=void 0};globalThis.__DEV__!==!1&&q("parser",function(){return h?h.size:0});function G(e,a){var n=S("parser",x,[e]),r=I(a),t=I(n.type);f(n.type===a,98,r,r,t)}function J(e,a,n,r){"use no memo";r===void 0&&(r="Please remove this option.");var t=D.useRef(!1);globalThis.__DEV__!==!1&&a in e&&!t.current&&(M(e,a,n,r),t.current=!0)}const U=l`
  query ObtenerVuelos($destinoId: ID!) {
    vuelosPorDestino(destinoId: $destinoId) {
      id
      aerolinea
      origen
      fechaSalida
      fechaRegreso
      duracion
      escalas
      precio
      asientosDisponibles
      disponible
    }
  }
`,X=l`
  query ObtenerHoteles($destinoId: ID!) {
    hotelesPorDestino(destinoId: $destinoId) {
      id
      nombre
      estrellas
      ubicacion
      precioNoche
      fechaDesde
      fechaHasta
      habitacionesDisponibles
      disponible
      servicios
    }
  }
`,Y=l`
  mutation ReservarViaje($vueloId: ID!, $hotelId: ID, $pasajeros: Int!) {
    reservarViaje(vueloId: $vueloId, hotelId: $hotelId, pasajeros: $pasajeros) {
      codigo
      pasajeros
      noches
      total
      estado
    }
  }
`;export{o as D,X as O,Y as R,B as a,U as b,J as u,G as v};
