// src/pages/Admin/AdminApp.js
import {
	Admin,
	Create,
	Datagrid,
	Edit,
	EditButton,
	List,
	NumberInput,
	Resource,
	SimpleForm,
	TextField,
	TextInput,
} from 'react-admin';

import { BsTag, BsBoxSeam, BsReceipt } from 'react-icons/bs';
import apiService from '../../services/apiService';
import categoryApi from '../Category/services/Category.api';
import orderApi from '../Order/services/Order.api';

// petit helper pour récupérer un id dans les payloads API Platform
const getId = (item) =>
	item.id ||
	item.id_produit ||
	item.id_categorie ||
	item.id_commande ||
	(item['@id'] ? item['@id'].split('/').pop() : undefined);

// helpers payload
const toStr = (v) => (v === undefined || v === null ? '' : String(v));

// on fabrique un payload PRODUIT "propre" pour ton back
// helpers payload
const buildProductCreatePayload = (data) => ({
	nom: data.nom ?? '',
	reference: data.reference ?? '',
	description: data.description ?? '',
	prix_ht: toStr(data.prix_ht) ?? '0',
	stock: data.stock ?? 0,
	// pour la création on met une cat et une tva par défaut
	categories: ['/api/categories/1'],
	tva: '/api/tvas/1',
});

const buildProductUpdatePayload = (data) => ({
	nom: data.nom ?? '',
	reference: data.reference ?? '',
	description: data.description ?? '',
	prix_ht: toStr(data.prix_ht) ?? '0',
	stock: data.stock ?? 0,
	// 🔴 surtout PAS categories / tva ici
});


// dataProvider
const dataProvider = {
	// LIST
	getList: async (resource, params) => {
		const { page, perPage } = params.pagination;
		const query = { page, itemsPerPage: perPage };

		let json;

		if (resource === 'categories') {
			json = await categoryApi.getAllCategories(query);
		} else if (resource === 'commandes') {
			json = await orderApi.getAllOrders(query);
		} else if (resource === 'produits') {
			// ICI on passe par ton apiService générique
			json = await apiService.find('produits', query);
		} else {
			json = await apiService.find(resource, query);
		}

		const members = json['hydra:member'] || json.data || [];

		const data = members.map((item) => ({
			id: getId(item),
			...item,
		}));

		return {
			data,
			total: json['hydra:totalItems'] ?? data.length,
		};
	},

	// ONE
	getOne: async (resource, params) => {
		let json;
		if (resource === 'categories') {
			json = await categoryApi.getCategoryById(params.id);
		} else if (resource === 'commandes') {
			json = await orderApi.getOrderById(params.id);
		} else if (resource === 'produits') {
			json = await apiService.get(`produits/${params.id}`);
		} else {
			json = await apiService.get(`${resource}/${params.id}`);
		}
		return { data: { id: getId(json), ...json } };
	},

	// CREATE
	create: async (resource, params) => {
		let json;
		if (resource === 'categories') {
			json = await categoryApi.createCategory(params.data);
		} else if (resource === 'commandes') {
			json = await orderApi.createOrder(params.data);
		} else if (resource === 'produits') {
			const payload = buildProductCreatePayload(params.data);
			json = await apiService.post('produits', payload);
		} else {
			json = await apiService.post(resource, params.data);
		}
		return { data: { id: getId(json), ...json } };
	},

	// UPDATE
	update: async (resource, params) => {
		let json;
		if (resource === 'categories') {
			json = await categoryApi.updateCategory(params.id, params.data);
		} else if (resource === 'commandes') {
			json = await orderApi.updateOrder(params.id, params.data);
		} else if (resource === 'produits') {
			const payload = buildProductUpdatePayload(params.data);
			json = await apiService.patch(`produits/${params.id}`, payload);
		} else {
			json = await apiService.patch(`${resource}/${params.id}`, params.data);
		}
		return { data: { id: getId(json), ...json } };
	},

	// DELETE
	delete: async (resource, params) => {
		if (resource === 'categories') {
			await categoryApi.deleteCategory(params.id);
		} else if (resource === 'commandes') {
			await orderApi.deleteOrder(params.id);
		} else if (resource === 'produits') {
			await apiService.delete(`produits/${params.id}`);
		} else {
			await apiService.delete(`${resource}/${params.id}`);
		}
		return { data: { id: params.id } };
	},

	// hooks obligatoires
	getMany: async (resource, params) => {
		const res = await Promise.all(
			params.ids.map((id) => apiService.get(`${resource}/${id}`))
		);
		return {
			data: res.map((json) => ({ id: getId(json), ...json })),
		};
	},
	getManyReference: async () => ({ data: [], total: 0 }),
	updateMany: async () => ({ data: [] }),
	deleteMany: async () => ({ data: [] }),
};

// UI RA

// CATEGORIES
const CategoryList = () => (
	<List>
		<Datagrid>
			<TextField source="id" />
			<TextField source="nom" />
			<EditButton />
		</Datagrid>
	</List>
);

const CategoryEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput source="nom" />
		</SimpleForm>
	</Edit>
);

const CategoryCreate = () => (
	<Create>
		<SimpleForm>
			<TextInput source="nom" required />
		</SimpleForm>
	</Create>
);

// PRODUITS
const ProductList = () => (
	<List>
		<Datagrid>
			<TextField source="id" label="ID" />
			<TextField source="nom" label="Nom" />
			<TextField source="reference" label="Référence" />
			<TextField source="prix_ht" label="Prix HT" />
			<TextField source="prix_ttc" label="Prix TTC" />
			<TextField source="stock" label="Stock" />
			<EditButton />
		</Datagrid>
	</List>
);

const ProductEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput source="nom" label="Nom" />
			<TextInput source="reference" label="Référence" />
			<TextInput source="description" label="Description" />
			<NumberInput source="prix_ht" label="Prix HT" />
			<NumberInput source="prix_ttc" label="Prix TTC" disabled />
			<NumberInput source="stock" label="Stock" />
		</SimpleForm>
	</Edit>
);

const ProductCreate = () => (
	<Create>
		<SimpleForm>
			<TextInput source="nom" label="Nom" />
			<TextInput source="reference" label="Référence" />
			<TextInput source="description" label="Description" />
			<NumberInput source="prix_ht" label="Prix HT" />
			<NumberInput source="prix_ttc" label="Prix TTC" />
			<NumberInput source="stock" label="Stock" />
		</SimpleForm>
	</Create>
);

// COMMANDES
const OrderList = () => (
	<List>
		<Datagrid>
			<TextField source="id" />
			<TextField source="id_utilisateur" />
			<TextField source="total" />
			<TextField source="etat" />
			<EditButton />
		</Datagrid>
	</List>
);

const OrderEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput source="etat" />
		</SimpleForm>
	</Edit>
);

// ADMIN
export default function AdminApp() {
	return (
		<Admin dataProvider={dataProvider}>
			<Resource
				name="categories"
				list={CategoryList}
				edit={CategoryEdit}
				icon={BsTag}
				create={CategoryCreate}
			/>
			<Resource
				name="produits"
				list={ProductList}
				edit={ProductEdit}
				icon={BsBoxSeam}
				create={ProductCreate}
			/>
			<Resource 
			name="commandes" 
			list={OrderList} 
			edit={OrderEdit} 
			icon={BsReceipt}
			/>
		</Admin>
	);
}
