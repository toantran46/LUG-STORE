import React from 'react';
import PropTypes from 'prop-types';
import "./Product.scss";
import { DeleteFilled, EditFilled, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Checkbox, Col, Form, Input, InputNumber, Modal, Pagination, Popconfirm, Row, Select, Table, Tag, Upload } from 'antd';
import ProductTable from 'features/Admin/components/ProductTable';
import ProductForm from 'features/Admin/components/ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { toastError, toastSucsess } from 'utils/notification';
import TextArea from 'antd/lib/input/TextArea';
import { fetch_products, savePagination } from 'features/Admin/adminSlice';
import { loaisanphamApi } from 'api/loaisanphamApi';
import { thuonghieuApi } from 'api/thuonghieuApi';
import { mausacApi } from 'api/mausacApi';
import { sanphamApi } from 'api/sanphamApi';
import { Label } from 'reactstrap';
import Search from 'antd/lib/transfer/search';
import moment from 'moment';
import { format } from 'assets/global/FormatMoney';

Product.propTypes = {

};
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });

function Product(props) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState();
    const [rowSelected, setRowSelected] = React.useState([]);
    // const [fileList, setFileList] = React.useState({});
    const [isAvatar, setIsAvatar] = React.useState([]);
    const [isProductTypes, setIsProductTypes] = React.useState([]);
    const [isBrands, setIsBrands] = React.useState([]);
    const [isColors, setIsColors] = React.useState([]);
    const [isUploadColors, setIsUploadColors] = React.useState([]);
    const [isColorsInfo, setIColorsInfo] = React.useState([]);

    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState('');
    const [previewTitle, setPreviewTitle] = React.useState('');
    const [searchValue, setSearchValue] = React.useState();
    const [listProductSearch, setListProductSearch] = React.useState();
    const useRef = React.useRef();
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleAdd = () => {
        setIsModalOpen(true);
        setIsEdit(false);
        form.resetFields();
        setIColorsInfo([]);
    }
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const {
        data: { products },
        pagination: { products: pagination } } = useSelector(state => state.adminInfo);

    const initialValues = {
        HASP_DUONGDAN: '',
        SP_TEN: '',
        LSP_MALOAI: '',
        TH_MATHUONGHIEU: '',
        SP_GIAGOC: '',
        SP_KICHTHUOC: '',
        SP_CHATLIEU: '',
        SP_SONGAN: '',
        SP_CANNANG: '',
        SP_TINHNANG: '',
    }
    const columns = [
        {
            title: '???nh s???n ph???m',
            dataIndex: 'HASP_DUONGDAN',
            render: (id, row) =>
                <Avatar src={id} shape="square" />

        },
        {
            title: 'T??n s???n ph???m',
            dataIndex: 'SP_TEN',
        },
        {
            title: 'Lo???i',
            dataIndex: 'LSP_TENLOAI',
        },
        {
            title: 'Th????ng hi???u',
            dataIndex: 'TH_TENTHUONGHIEU',
        },
        {
            title: 'Gi?? g???c',
            dataIndex: 'SP_GIAGOC',
            render: (row) => format(row) + '??',
        },
        {
            title: 'K??ch th?????c',
            dataIndex: 'SP_KICHTHUOC',
        },
        {
            title: 'Ch???t li???u',
            dataIndex: 'SP_CHATLIEU',
        },
        {
            title: 'S??? ng??n',
            dataIndex: 'SP_SONGAN',
        },
        {
            title: 'C??n n???ng',
            dataIndex: 'SP_CANNANG',
        },
        {
            title: 'T??nh n??ng',
            dataIndex: 'SP_TINHNANG',
        },
        {
            title: 'Tr???ng th??i',
            dataIndex: 'TONGSOLUONGKHO',
            render: (id, row) => <div>
                {id == 0 ? <Tag color='error'>H???t h??ng</Tag>
                    : <Tag color='success'>C??n h??ng</Tag>}

            </div>
        },
        {
            title: 'Ng??y t???o',
            dataIndex: 'SP_NGAYTAO',
            render: (id, row) => <div>{moment(id).format('MMMM Do YYYY, h:mm:ss')}</div>
        },
        {
            title: 'Thao t??c',
            dataIndex: 'SP_MA',
            render: (id, row) =>
                <div className="changes">
                    <Button
                        onClick={() => handleEdit(row)}
                    >
                        <EditFilled />
                    </Button>
                    <Popconfirm
                        placement="topRight"
                        title={"B???n c?? ch???c ch???n mu???n x??a"}
                        onConfirm={() => handleDelete(id)}
                        okText="C??"
                        cancelText="kh??ng"
                    >
                        <Button
                        >
                            <span className='delete-icon'><DeleteFilled /></span>
                        </Button>
                    </Popconfirm>

                </div>
        }
    ];


    const handleEdit = (row) => {
        setIsModalOpen(true);
        setIsEdit(true);
        console.log(row);
        setRowSelected(row)
        form.setFieldsValue({
            ...row,
            SP_GIAGOC: row.SP_GIAGOC * 1,
        });
    };


    const fetch_image_color = async (masp) => {
        try {
            const { result } = await mausacApi.getAll({
                action: 'getAllColorByProductId',
                IDsanpham: masp,
            });
            const color = result.map((e) => e.MS_MAMAU)
            form.setFieldValue('MS_MAMAU', color);
            const initialColorInfo = result.map((data) => {
                const anhsp = data.hinhanh.map((obj) => ({
                    uid: obj.HASP_MAHINHANH,
                    name: 'image.png',
                    status: 'done',
                    url: obj.HASP_DUONGDAN,
                }))
                return {
                    colorId: data.MS_MAMAU,
                    soLuongSp: data.CTMS_SOLUONG,
                    anhSp: anhsp
                }
            })
            setIColorsInfo(initialColorInfo);
            console.log(initialColorInfo)
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {

        isEdit && fetch_image_color(rowSelected.SP_MA)
    }, [isEdit, rowSelected])

    const [fileList, setFileList] = React.useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    const handleCancelImg = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = (newFileList, indx) => {
        setIColorsInfo(prev => {
            let newColorInfo = [...prev];
            newColorInfo[indx].anhSp = newFileList;
            console.log(newColorInfo);
            return newColorInfo;
        })
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    const handleUpload = (list, fileList) => {
        if (list.type === "image/png" || list.type === "image/jpg" || list.type === "image/jpeg") {
            return false
        }
        else {
            return true
        }
    }
    const handleSave = async (values) => {
        try {
            setIsLoading(true);
            console.log(values)
            console.log(isColorsInfo);
            const color = isColorsInfo?.map((e) => ({
                id: e.colorId,
                soluong: e.soLuongSp,
                soluonganh: e.anhSp.length,
                anhcu: e.anhSp?.filter(file => file.url).map(file => file.url),
            }))
            let images = []
            isColorsInfo?.forEach((e) => {
                const fileObj = e.anhSp?.map(file => file.originFileObj);
                images = [...images, ...fileObj]
            })
            const data = new FormData();
            data.append('ColorInfo', JSON.stringify(color))
            data.append('DETELE_IMG_COLOR', JSON.stringify(color))
            images.forEach((file) => {
                data.append('HASP_DUONGDAN', file)
            })
            // console.log(images);
            data.append('TEN', values.SP_TEN)
            data.append('MALOAI', values.LSP_MALOAI)
            data.append('MATHUONGHIEU', values.TH_MATHUONGHIEU)
            data.append('GIAGOC', values.SP_GIAGOC)
            data.append('GIABAN', values.SP_GIABAN)
            data.append('CHATLIEU', values.SP_CHATLIEU)
            data.append('KICHTHUOC', values.SP_KICHTHUOC)
            data.append('CANNANG', values.SP_CANNANG)
            data.append('SONGAN', values.SP_SONGAN)
            data.append('TINHNANG', values.SP_TINHNANG)

            console.log(color);
            const { message } = !isEdit ? await sanphamApi.post(data) : await sanphamApi.update(rowSelected.SP_MA, data);
            await dispatch(fetch_products({ _limit: pagination._limit, _page: pagination._page }));
            setIsLoading(false);
            toastSucsess(message);
            setIsModalOpen(false);

        } catch (error) {
            setIsLoading(false);
            toastError('???? c?? l???i trong qu?? tr??nh upload ???nh, xin th??? l???i' + error.response.data.message);
        }
    }

    const handleDelete = async (id) => {
        try {
            // const { message } = await thanhvienApi.delete(id);
            // await dispatch(fetch_products({ _limit: pagination._limit, _page: pagination._page }));
            // toastSucsess(message);
        }
        catch (error) {
            console.log({ error });
            toastError(error.response.data.message);
        }
    }

    const handleChangeColor = (checkedValues) => {
        // console.log(checkedValues);
        const checked = checkedValues.map((data) => {
            const index = isColorsInfo.findIndex(e => e.colorId === data)
            return index === -1 ?
                ({
                    colorId: data,
                    soLuongSp: 1,
                    anhSp: null,
                })
                :
                ({
                    colorId: data,
                    soLuongSp: isColorsInfo[index].soLuongSp,
                    anhSp: isColorsInfo[index].anhSp,
                })

        });
        setIColorsInfo(checked);

        console.log(checked)
    }
    const handleChangeQuantity = (value, indx) => {
        setIColorsInfo(prev => {
            let newColorInfo = [...prev];
            newColorInfo[indx].soLuongSp = value;
            return newColorInfo;
        })
    }
    const onSearch = (e) => {
        setSearchValue(e.target.value)
    }
    React.useEffect(() => {
        if (useRef.current) clearTimeout(useRef.current);
        useRef.current = setTimeout(() => {
            const fetch_search_product = async () => {
                const { result } = await sanphamApi.getAll({ searchBy: searchValue })
                // console.log(result)
                setListProductSearch(result);
            }
            fetch_search_product();
        }, 500)
    }, [searchValue])
    React.useEffect(() => {
        const fetch_product_types = async () => {
            try {
                const { result } = await loaisanphamApi.getAll();
                // console.log(result)
                setIsProductTypes(result?.map((e) => (
                    { label: e.LSP_TENLOAI, value: e.LSP_MALOAI }
                )));

            } catch (error) {
                console.log(error);
            }
        }
        const fetch_brands = async () => {
            try {
                const { result } = await thuonghieuApi.getAll();
                // console.log(result)
                setIsBrands(result?.map((e) => (
                    { label: e.TH_TENTHUONGHIEU, value: e.TH_MATHUONGHIEU }
                )));

            } catch (error) {
                console.log(error);
            }
        }
        const fetch_colors = async () => {
            try {
                const { result } = await mausacApi.getAll();
                // console.log(result)
                setIsColors(result?.map((e) => (
                    { label: e.MS_TENMAU, value: e.MS_MAMAU }
                )));

            } catch (error) {
                console.log(error);
            }
        }
        fetch_colors();
        fetch_brands();
        fetch_product_types();
    }, [])

    // console.log(isColorsInfo);

    return (
        <div className='product'>
            <div className="content">
                <div className="title-header">
                    <h4>Qu???n l?? s???n ph???m</h4>
                    <div className="search">
                        <Search placeholder="T??m ki???m s???n ph???m" onChange={onSearch} size='small' style={{ width: 400 }} enterButton />
                    </div>
                    <div className="add-sp">
                        <Button
                            onClick={handleAdd}
                            loading={isLoading}
                            type="primary"
                            icon={<PlusCircleOutlined />
                            }
                        >
                            Th??m s???n ph???m
                        </Button>
                        <Modal
                            title="Th??m s???n ph???m"
                            visible={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            width={1200}

                        >

                            <Form
                                form={form}
                                layout='horizontal'
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 14 }}
                                onFinish={handleSave}
                                initialValues={initialValues}
                            >
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            name="SP_TEN"
                                            label="T??n"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "T??n kh??ng ???????c b??? tr???ng",
                                                }
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name="LSP_MALOAI"
                                            label="Lo???i"
                                        >
                                            <Select options={isProductTypes} />
                                        </Form.Item>
                                        <Form.Item
                                            name="TH_MATHUONGHIEU"
                                            label="Th????ng hi???u"
                                        >
                                            <Select options={isBrands} />
                                        </Form.Item>
                                        <Form.Item
                                            name="SP_GIAGOC"
                                            label="Gi?? g???c"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Gi?? kh??ng ???????c b??? tr???ng",
                                                },
                                            ]}
                                        >
                                            <InputNumber style={{ width: '100%' }} />
                                        </Form.Item>
                                        <Form.Item
                                            name="SP_GIABAN"
                                            label="Gi?? b??n"
                                        >
                                            <InputNumber style={{ width: '100%' }} />
                                        </Form.Item>
                                        <Form.Item
                                            name="MS_MAMAU"
                                            label="M??u s???c"
                                        >
                                            <Checkbox.Group onChange={handleChangeColor} options={isColors} />

                                        </Form.Item>
                                        {isColorsInfo?.map((data, indx) =>
                                            <div>
                                                <Label>S??? l?????ng:</Label>
                                                <Input type='number' disabled value={data.soLuongSp} onChange={({ target }) => handleChangeQuantity(target.value, indx)} />
                                                <br />
                                                <br />
                                                <Form.Item>
                                                    <Upload
                                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                        listType="picture-card"
                                                        fileList={isColorsInfo[indx]?.anhSp}
                                                        onPreview={handlePreview}
                                                        onChange={({ fileList }) => handleChange(fileList, indx)}
                                                        beforeUpload={handleUpload}
                                                    >
                                                        {fileList.length >= 8 ? null : uploadButton}
                                                    </Upload>
                                                    <Modal
                                                        visible={previewOpen}
                                                        title={previewTitle}
                                                        footer={null}
                                                        onCancel={handleCancelImg}
                                                    >
                                                        <img
                                                            alt="example"
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            src={previewImage}
                                                        />
                                                    </Modal>
                                                </Form.Item>
                                            </div>
                                        )}
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="SP_CHATLIEU"
                                            label="Ch???t li???u"
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name="SP_KICHTHUOC"
                                            label="K??ch th?????c"
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name="SP_CANNANG"
                                            label="C??n n???ng"
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name="SP_SONGAN"
                                            label="S??? ng??n"
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name="SP_TINHNANG"
                                            label="T??nh n??ng"
                                        >
                                            <TextArea />
                                        </Form.Item>
                                        <Button type='primary' loading={isLoading} htmlType='submit'>L??u</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal>
                    </div>

                </div>
                <p>T???ng s???: {products?.length < pagination?._limit ? products.length : pagination._limit}/ {pagination._totalRecord} b???n ghi</p>
                <div className="product-table">
                    <Table
                        columns={columns}
                        dataSource={searchValue ? listProductSearch : products}
                        pagination={false}
                    />
                    <div className="mt-3">
                    </div>
                </div>
                <Pagination
                    pageSize={1}
                    current={pagination._page}
                    total={pagination._totalPage}
                    onChange={(page) => dispatch(savePagination({ screen: 'products', page }))}
                >
                </Pagination>
            </div>
        </div>
    );
}

export default Product;