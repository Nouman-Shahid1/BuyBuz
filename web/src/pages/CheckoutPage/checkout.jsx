import { Fragment, useState ,useEffect} from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  Popover,
  RadioGroup,
  Tab,
  Transition,
} from "@headlessui/react";
import {
  QuestionMarkCircleIcon,
  SearchIcon,
  ShoppingBagIcon,
} from "@heroicons/react/outline";
import { XMarkIcon,  CheckCircleIcon ,Bars3Icon } from "@heroicons/react/24/outline";
import {  TrashIcon } from "@heroicons/react/solid";
import axios from "axios";
import { countries } from "countries-list";
import { useCart } from "../../context/cartContext";
const currencies = ["CAD", "USD", "AUD", "EUR", "GBP"];
const navigation = {
  categories: [
    {
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
        {
          name: "Accessories",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg",
          imageAlt:
            "Model wearing minimalist watch with black wristband and white watch face.",
        },
        {
          name: "Carry",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg",
          imageAlt:
            "Model opening tan leather long wallet with credit card pockets and cash pouch.",
        },
      ],
    },
    {
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg",
          imageAlt:
            "Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg",
          imageAlt: "Model wearing light heather gray t-shirt.",
        },
        {
          name: "Accessories",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg",
          imageAlt:
            "Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.",
        },
        {
          name: "Carry",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg",
          imageAlt:
            "Model putting folded cash into slim card holder olive leather wallet with hand stitching.",
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};
const products = [
  {
    id: 1,
    title: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Black",
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  // More products...
];
const deliveryMethods = [
  {
    id: 1,
    title: "Standard",
    turnaround: "4–10 business days",
    price: "$5.00",
  },
  { id: 2, title: "Express", turnaround: "2–5 business days", price: "$16.00" },
];

const footerNavigation = {
  products: [
    { name: "Bags", href: "#" },
    { name: "Tees", href: "#" },
    { name: "Objects", href: "#" },
    { name: "Home Goods", href: "#" },
    { name: "Accessories", href: "#" },
  ],
  company: [
    { name: "Who we are", href: "#" },
    { name: "Sustainability", href: "#" },
    { name: "Press", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy", href: "#" },
  ],
  customerService: [
    { name: "Contact", href: "#" },
    { name: "Shipping", href: "#" },
    { name: "Returns", href: "#" },
    { name: "Warranty", href: "#" },
    { name: "Secure Payments", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Find a store", href: "#" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CheckoutPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const countryNames = Object.values(countries).map((country) => country.name);

  const calculateSubtotal = () =>
    cart.items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

  const calculateOrderTotal = () => {
    const shippingPrice = selectedDeliveryMethod
      ? parseFloat(selectedDeliveryMethod.price.replace("$", ""))
      : 0;
    return (parseFloat(calculateSubtotal()) + shippingPrice).toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value); // Update email state
    } else {
      setShippingAddress((prev) => ({ ...prev, [name]: value }));
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            const decoded = jwtDecode(token);
            console.log("Decoded token:", decoded); // Debugging
            
            // Check if the token is expired
            if (decoded.exp * 1000 < Date.now()) {
                setError("Session expired. Please log in again.");
                localStorage.removeItem("authToken"); // Clear the invalid token
            } else {
                setUserId(decoded.id); // Extract only `id` from the token
            }
        } catch (error) {
            console.error("Error decoding token:", error);
            setError("Invalid token. Please log in again.");
        }
    } else {
        setError("You must log in to place an order.");
    }
}, []);


  
  


  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    if (!userId) {
      setError("User not authenticated. Please log in again.");
      return;
  }

    const orderPayload = {
      user: userId, // Ensure this is set
      email,        // Ensure email is valid
      items: cart.items.map((item) => ({
        product: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingAddress,
      deliveryMethod: selectedDeliveryMethod?.title || "Standard",
      subtotal: parseFloat(calculateSubtotal()),
      shippingCost: selectedDeliveryMethod
        ? parseFloat(selectedDeliveryMethod.price.replace("$", ""))
        : 0,
      total: parseFloat(calculateOrderTotal()),
    };
  
    console.log("Order payload:", orderPayload); // Debugging
  
    try {
      const response = await axios.post("http://localhost:5000/api/orders", orderPayload);
      if (response.status === 201) {
        setSuccess("Order placed successfully!");
        clearCart();
        navigate("/products");
      }
    } catch (error) {
      setError("Failed to place the order. Please try again.");
    }
  };
  

  return (
    <div className="bg-gray-50">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex px-4 space-x-8">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? "text-indigo-600 border-indigo-600"
                              : "text-gray-900 border-transparent",
                            "flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {navigation.categories.map((category) => (
                    <Tab.Panel
                      key={category.name}
                      className="px-4 py-6 space-y-12"
                    >
                      <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                        {category.featured.map((item) => (
                          <div key={item.name} className="group relative">
                            <div className="aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden group-hover:opacity-75">
                              <img
                                src={item.imageSrc}
                                alt={item.imageAlt}
                                className="object-center object-cover"
                              />
                            </div>
                            <a
                              href={item.href}
                              className="mt-6 block text-sm font-medium text-gray-900"
                            >
                              <span
                                className="absolute z-10 inset-0"
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                            <p
                              aria-hidden="true"
                              className="mt-1 text-sm text-gray-500"
                            >
                              Shop now
                            </p>
                          </div>
                        ))}
                      </div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a
                      href={page.href}
                      className="-m-2 p-2 block font-medium text-gray-900"
                    >
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <a
                    href="#"
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    Create an account
                  </a>
                </div>
                <div className="flow-root">
                  <a
                    href="#"
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    Sign in
                  </a>
                </div>
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {/* Currency selector */}
                <form>
                  <div className="inline-block">
                    <label htmlFor="mobile-currency" className="sr-only">
                      Currency
                    </label>
                    <div className="-ml-2 group relative border-transparent rounded-md focus-within:ring-2 focus-within:ring-white">
                      <select
                        id="mobile-currency"
                        name="currency"
                        className="bg-none border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-800 focus:outline-none focus:ring-0 focus:border-transparent"
                      >
                        {currencies.map((currency) => (
                          <option key={currency}>{currency}</option>
                        ))}
                      </select>
                      <div className="absolute right-0 inset-y-0 flex items-center pointer-events-none">
                        <svg
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                          className="w-5 h-5 text-gray-500"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M6 8l4 4 4-4"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <nav aria-label="Top">
          <div className="bg-gray-900">
            <div className="max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8">
              <form>
                <div>
                  <label htmlFor="desktop-currency" className="sr-only">
                    Currency
                  </label>
                  <div className="-ml-2 group relative bg-gray-900 border-transparent rounded-md focus-within:ring-2 focus-within:ring-white">
                    <select
                      id="desktop-currency"
                      name="currency"
                      className="bg-none bg-gray-900 border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-white group-hover:text-gray-100 focus:outline-none focus:ring-0 focus:border-transparent"
                    >
                      {currencies.map((currency) => (
                        <option key={currency}>{currency}</option>
                      ))}
                    </select>
                    <div className="absolute right-0 inset-y-0 flex items-center pointer-events-none">
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                        className="w-5 h-5 text-gray-300"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M6 8l4 4 4-4"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </form>

              <div className="flex items-center space-x-6">
                <a
                  href="#"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Sign in
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Create an account
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>

          <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Contact information
                </h2>

                <div className="mt-4">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                       type="email"
                       id="email-address"
                       name="email"
                       value={email}
                       onChange={handleInputChange}
                      autoComplete="email"
                      className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">
                  Shipping information
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={shippingAddress.firstName}
                    onChange={handleInputChange}
                    required
                        autoComplete="given-name"
                        className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="lastName"
                    id="lastName"
                    value={shippingAddress.lastName}
                    onChange={handleInputChange}
                    required
                        autoComplete="family-name"
                        className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                 

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="address"
                    id="address"
                    value={shippingAddress.address}
                    onChange={handleInputChange}
                    required
                        autoComplete="street-address"
                        className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="city"
                    id="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    required
                        autoComplete="address-level2"
                        className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <div className="mt-1">
                      <select
                        name="country"
                        id="country"
                        value={shippingAddress.country}
                        onChange={handleInputChange}
                        required
                        autoComplete="country-name"
                        className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        {countryNames.map((countryName, index) => (
                          <option key={index}>{countryName}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="state"
                        id="state"
                        value={shippingAddress.state}
                        onChange={handleInputChange}
                        required
                        autoComplete="address-level1"
                        className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={handleInputChange}
                        required
                        autoComplete="postal-code"
                        className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                    id="phone"
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    required
                        autoComplete="tel"
                        className="block w-full py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
  <RadioGroup value={selectedDeliveryMethod} onChange={setSelectedDeliveryMethod}>
    <RadioGroup.Label className="text-lg font-medium text-gray-900">
      Delivery method
    </RadioGroup.Label>

    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
      {deliveryMethods.map((deliveryMethod) => (
        <RadioGroup.Option
          key={deliveryMethod.id}
          value={deliveryMethod}
          className={({ checked, active }) =>
            classNames(
              checked ? "border-transparent" : "border-gray-300",
              active ? "ring-2 ring-indigo-500" : "",
              "relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
            )
          }
        >
          {({ checked, active }) => (
            <>
              <div className="flex-1 flex">
                <div className="flex flex-col">
                  <RadioGroup.Label
                    as="span"
                    className="block text-sm font-medium text-gray-900"
                  >
                    {deliveryMethod.title}
                  </RadioGroup.Label>
                  <RadioGroup.Description
                    as="span"
                    className="mt-1 flex items-center text-sm text-gray-500"
                  >
                    {deliveryMethod.turnaround}
                  </RadioGroup.Description>
                  <RadioGroup.Description
                    as="span"
                    className="mt-6 text-sm font-medium text-gray-900"
                  >
                    {deliveryMethod.price}
                  </RadioGroup.Description>
                </div>
              </div>
              {checked ? (
                <CheckCircleIcon
                  className="h-5 w-5 text-indigo-600"
                  aria-hidden="true"
                />
              ) : null}
              <div
                className={classNames(
                  active ? "border" : "border-2",
                  checked ? "border-indigo-500" : "border-transparent",
                  "absolute -inset-px rounded-lg pointer-events-none"
                )}
                aria-hidden="true"
              />
            </>
          )}
        </RadioGroup.Option>
      ))}
    </div>
  </RadioGroup>
</div>

            </div>
            <div className="mt-10 lg:mt-0">
  <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
  <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
    <ul className="divide-y divide-gray-200">
      {cart.items.map((item) => (
        <li key={item.id} className="flex py-6 px-4 sm:px-6">
          <div className="flex-shrink-0">
            <img src={item.image} alt={item.name} className="w-20 rounded-md" />
          </div>
          <div className="ml-6 flex-1 flex flex-col">
            <div className="flex justify-between">
              <h4 className="text-sm">
                <span className="font-medium text-gray-700">{item.name}</span>
              </h4>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="w-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 6h18v2H3zm4 12h2v-8H7zm6 0h-2v-8h2zm2 0h2v-8h-2zM5 6V4h2V2h10v2h2v2zM7 22h10v-2H7z" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2">
                {/* Decrease Quantity Button */}
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    if (item.quantity > 1) {
                      updateQuantity(item.id, item.quantity - 1);
                    } else {
                      removeFromCart(item.id);
                    }
                  }}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>

                {/* Display Quantity */}
                <span className="px-2">{item.quantity}</span>

                {/* Increase Quantity Button */}
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    updateQuantity(item.id, item.quantity + 1);
                  }}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <p className="text-sm font-medium text-gray-900">
                ${item.quantity * item.price}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
    <div className="border-t border-gray-200 py-6 px-4">
      <div className="flex justify-between text-sm">
        <p>Subtotal:</p>
        <p>${calculateSubtotal()}</p>
      </div>
      <div className="flex justify-between text-sm mt-4">
        <p>Shipping:</p>
        <p>{selectedDeliveryMethod ? selectedDeliveryMethod.price : "$0.00"}</p>
      </div>
      <div className="flex justify-between text-sm mt-4 border-t border-gray-200 pt-4">
        <p>Total:</p>
        <p>${calculateOrderTotal()}</p>
      </div>
      <div className="mt-6">
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <button
          type="submit"
          onClick={handleConfirmOrder}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? "Placing Order..." : "Confirm Order"}
        </button>
      </div>
    </div>
  </div>
</div>


          </form>
        </div>
      </main>
    </div>
  );
};
export default CheckoutPage;
