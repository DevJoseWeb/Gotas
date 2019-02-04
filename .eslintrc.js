module.exports = {
    "extends": "airbnb",
    "rules": {
        "no-unused-expressions": ["error", {"allowTernary": true, "allowShortCircuit": true}]
    },
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }]
};